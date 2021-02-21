import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {
  audiofileInfo: FormGroup = new FormGroup({});
  audioType!: string;
  data: any;

  constructor(private flaskApiService: CRUDService) { }
  audiofileType(event: string) {

    this.audioType = event
    console.log(this.audioType)
  }


  /** The route will be in the following format: “<audioFileType>/<audioFileID>”**/

  ngOnInit() {
    this.audiofileInfo = new FormGroup(
      {
        audiofileID: new FormControl(''),

      }
    )
  }

  onSubmit() {
    console.log(this.audioType)
    this.flaskApiService.getData(this.audioType, this.audiofileInfo.value['audiofileID']).subscribe(res => { console.log(res); this.data = res })

  }


}
