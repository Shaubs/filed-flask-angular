import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private http: HttpClient) { }

  ///IF CONNECTION TO SERVER FAILS
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}. Maybe server.py is not running`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public server = "http://localhost/audioFile/";

  public getData(audioFileType: string, fileID: string) {
    let data = (fileID != '') ? this.http.get(this.server + `readData/${audioFileType}/${fileID}`).pipe(catchError(this.handleError)) : this.http.get(this.server + `readData/${audioFileType}/empty`).pipe(catchError(this.handleError));
    return data
  }

  public createData(audioFile: any) {
    let response = this.http.post(this.server + `create`, audioFile).pipe(catchError(this.handleError));
    return response
  }
  //audiodileType/audiofileID
  public updateData(audioFileType: string, audiofileID: string, audioFile: any) {
    let response = this.http.patch(this.server + `updateData/${audioFileType}/${audiofileID}`, audioFile)//.pipe(catchError(this.handleError))
    return response

  }
  public deleteData(audioFileType: string, audioFileID: string) {
    let response = this.http.delete(this.server + `delete/${audioFileType}/${audioFileID}`)
    return response

  }
}
