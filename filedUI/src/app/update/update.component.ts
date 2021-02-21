import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CRUDService } from '../crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  audioType!: string;
  Response: any;

  podcastInfo: FormGroup = new FormGroup({});

  songInfo: FormGroup = new FormGroup({});

  audiobookInfo: FormGroup = new FormGroup({});

  constructor(private flaskServiceApi: CRUDService) { }

  ngOnInit(): void {
    this.podcastInfo = new FormGroup(

      {
        ID: new FormControl('', [Validators.required]),
        Name: new FormControl(''),
        Duration: new FormControl(0),
        Host: new FormControl('', [Validators.maxLength(100)]),
        Participants: new FormControl('')

      }
    )
    this.songInfo = new FormGroup(
      {
        ID: new FormControl('', [Validators.required]),
        Name: new FormControl(''),
        Duration: new FormControl(0),

      }
    )
    this.audiobookInfo = new FormGroup(
      {
        ID: new FormControl('', [Validators.required]),
        Name: new FormControl(''),
        Author: new FormControl(''),
        Duration: new FormControl(0),
        Narrator: new FormControl('')

      }
    )


  }


  ///ID and Type entered + META DATA updated
  onSubmit() {
    let audiofileInfo: any;
    if (this.audioType == 'song') { audiofileInfo = this.songInfo.value }
    if (this.audioType == 'podcast') { audiofileInfo = this.podcastInfo.value }
    if (this.audioType == 'audiobook') { audiofileInfo = this.audiobookInfo.value }
    audiofileInfo['uploadDate'] = new Date();
    console.log(typeof (this.audioType))

    console.log("yay", audiofileInfo)

    this.flaskServiceApi.updateData(this.audioType, audiofileInfo['ID'], audiofileInfo).subscribe(res => {
      console.log(res); this.Response = [res];
    })


  }
}
