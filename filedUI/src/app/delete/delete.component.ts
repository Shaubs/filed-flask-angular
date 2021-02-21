import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  audiofileInfo: FormGroup = new FormGroup({});
  audioType!: string;
  Response: any;

  constructor(private flaskServiceApi: CRUDService) { }
  audiofileType(event: string) {

    this.audioType = event
    console.log(this.audioType)
  }


  /** The route will be in the following format: “<audioFileType>/<audioFileID>”**/

  ngOnInit() {
    this.audiofileInfo = new FormGroup(
      {
        audiofileID: new FormControl('', [Validators.required]),

      }
    )

  }


  onSubmit() {
    console.log("yay", this.audiofileInfo.value)
    this.flaskServiceApi.deleteData(this.audioType, this.audiofileInfo.value['audiofileID']).subscribe(res => { this.Response = res })
  }

}
