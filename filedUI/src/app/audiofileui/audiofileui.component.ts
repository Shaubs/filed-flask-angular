import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audiofileui',
  templateUrl: './audiofileui.component.html',
  styleUrls: ['./audiofileui.component.scss']
})
export class AudiofileuiComponent implements OnInit {

  /** id,name,duration,uploaddate-time**/

  /** id,name,duration,uploaddate-time**/

  public song!: boolean;
  podcast!: boolean;
  audiobook!: boolean;

  ngOnInit() {


  }
  Song() {
    this.song = true;
    this.podcast = false;
    this.audiobook = false;
    console.log(this.song)
  }
  Podcast() {
    this.song = false;
    this.podcast = true;
    this.audiobook = false;
  }
  Audiobook() {
    this.song = false;
    this.podcast = false;
    this.audiobook = true;
  }

}
