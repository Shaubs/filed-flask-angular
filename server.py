from flask import Flask,Response,request,render_template
import pymongo
import json
import bson

app = Flask(__name__)


try:
    mongo=pymongo.MongoClient(
        host="localhost",
        port=27017,
        serverSelectionTimeoutMS=1000
    )
    db=mongo.filed
    mongo.server_info() ##trigger if cannot connect to db
    print("DB CONNECTION---SUCCESS!!")
except Exception as ex:
    print(ex)
    print("ERROR - Cannot connect to  DB")


@app.after_request
def after_request(response):
  response.headers['Access-Control-Allow-Origin']='*'
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  response.headers['X-Content-Type-Options'] = 'nosniff'
  return response

###################
# READ AUDIOFILE
@app.route("/audioFile/readData/<filetype>/<fileid>",methods=["GET"])
def get_some_file(filetype,fileid):
    try:
        if(fileid=='empty'):
            data =  list(db.audiofiles.find({'type':filetype}))
        else:
            data = list(db.audiofiles.find({'_id':bson.ObjectId(oid=str(fileid)),'type':filetype}))
    
        for file in data:
            file["_id"]=str(file["_id"])

        if(json.dumps(data)=='[]'):
            return Response(
                response=json.dumps({"message":"Sorry file cannot be found.Please check the id and type selected"}),
                status=200,
                mimetype="application/json")
        
        else:    
            return Response(
                response=json.dumps(data),
                status=200,
                mimetype="application/json"
            )
    except Exception as ex:
        print(ex)
        return Response(response=json.dumps({"message":"Can not find file. Please check the id and type selected"}),status=500,mimetype="application/json")

###################
#CREATE NEW AUDIO FILE
@app.route("/audioFile/create",methods=["POST"])
def postAudioFile():
    audiofile=json.loads(request.data.decode())
    print(type(audiofile),audiofile)
    try:
        dbResponse=db.audiofiles.insert_one(audiofile)
        # for attr in dir(dbResponse):
        #     print(attr)
        return Response(
            response=json.dumps(
                {"message":"audio file added to db",
                "id":f"{dbResponse.inserted_id}"
                }),
            status=200,
            mimetype="application/json"
        )
    except Exception as ex:
        print("**************")
        print(ex)        
        print("**************")
        return ex 

###################
#UPDATE NEW AUDIO FILE
@app.route("/audioFile/updateData/<filetype>/<fileid>",methods=["PATCH"])
def update_some_file(filetype,fileid):
    
    # audiofile=request.data.decode()
    
    try:
        jsonMetadata=json.loads(request.data.decode())
        newMetadata={}
        del jsonMetadata['ID']
        currentMetadata=(db.audiofiles.find_one({'type':filetype,'_id':bson.ObjectId(oid=str(fileid))}))
        currentMetadata=currentMetadata['metaData']
        for k in currentMetadata:
            print("JSON DATA:",jsonMetadata[k])
            if(jsonMetadata[k]==''):
                print("in if")
                newMetadata[k]=currentMetadata[k]
            else:
                newMetadata[k]=jsonMetadata[k]
        print(newMetadata)
    
        dbResponse=db.audiofiles.update_one({'type':filetype,'_id':bson.ObjectId(oid=str(fileid))},{'$set':{'metaData':newMetadata
        }})
        if(dbResponse.modified_count==1):
             return Response(
                response=json.dumps({'message':'Update made',"status":200}),
                status=200
                )
        else:
            return Response(response=json.dumps({"message":"Could not make update. Please check Type and ID"}),status=200,headers="application/json")

    except Exception as ex:
        print("**************")
        print(ex)        
        print("**************")
        return Response(
            response=json.dumps(
                {"message":"Sorry could not update.Check id and Type.","status":500}),
            status=200,#actually a status 500 
            mimetype="application/json"
        )


###################
#DELETE NEW AUDIO FILE
@app.route("/audioFile/delete/<filetype>/<fileid>",methods=["DELETE"])
def delete_some_file(filetype,fileid):
    print(fileid,filetype)
    try:
        dbResponse=db.audiofiles.delete_one({'_id':bson.ObjectId(oid=str(fileid)),'type':filetype})
        print(dbResponse.deleted_count)
        if(dbResponse.deleted_count==0):
            return Response(
                response=json.dumps(
                    {"message":"Sorry this file doesn't exist. Cannot delete it.",
                    "id":fileid,
                    "type":filetype
                    }),
                status=200,
                mimetype="application/json"
            )
        else:
             return Response(
                response=json.dumps(
                    {"message":"audio file deleted",
                    "id":fileid,
                    "type":filetype
                    }),
                status=200,
                mimetype="application/json"
            )

    except Exception as ex:
        print("**************")
        print(ex)        
        print("**************")
        return Response(
                response=json.dumps(
                    {"message":"Error. Could not delete file.",
                    "id":fileid,
                    "type":filetype,
                    "status":500
                    }),
                status=200,
                mimetype="application/json"
            )



if(__name__ =="__main__"):
    app.run(port=80,debug=True)