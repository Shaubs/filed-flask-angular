import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CRUDService } from 'src/app/crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  audioType!: string;

  podcastInfo: FormGroup = new FormGroup({});

  songInfo: FormGroup = new FormGroup({});

  audiobookInfo: FormGroup = new FormGroup({});
  Response: any;


  constructor(private flaskServiceApi: CRUDService) { }

  ngOnInit(): void {
    this.songInfo = new FormGroup(
      {
        Name: new FormControl('', [Validators.required]),
        Duration: new FormControl(0, [Validators.required, Validators.min(1)]),

      }
    )

    this.podcastInfo = new FormGroup(
      {
        Name: new FormControl('', [Validators.required]),
        Duration: new FormControl(0, [Validators.required, Validators.min(1)]),
        Host: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        Participants: new FormControl('')

      }
    )

    this.audiobookInfo = new FormGroup(
      {
        Name: new FormControl('', [Validators.required]),
        Author: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        Duration: new FormControl(0, [Validators.required, Validators.min(1)]),
        Narrator: new FormControl('', [Validators.required, Validators.maxLength(100)])

      }
    )

  }
  // TYPE AND META-DATA entered ; ID returned
  onSubmit() {
    let audiofileInfo: any;
    let file = {};
    if (this.audioType == 'song') { audiofileInfo = this.songInfo.value }
    if (this.audioType == 'podcast') { audiofileInfo = this.podcastInfo.value }
    if (this.audioType == 'audiobook') { audiofileInfo = this.audiobookInfo.value }
    audiofileInfo['uploadDate'] = new Date();
    file = { 'type': this.audioType, 'metaData': audiofileInfo }
    console.log("yay", audiofileInfo)

    this.flaskServiceApi.createData(file).subscribe(res => {
      console.log(res); this.Response = res;
    })


  }
}