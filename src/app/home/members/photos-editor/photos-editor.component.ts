import { Component, OnInit, Input } from '@angular/core';
import { IPhoto } from 'src/app/models/IPhoto';


@Component({
  selector: 'app-photos-editor',
  templateUrl: './photos-editor.component.html',
  styleUrls: ['./photos-editor.component.scss']
})
export class PhotosEditorComponent implements OnInit {

  @Input() photos: IPhoto[];

  constructor() { }

  ngOnInit() {
    console.log(this.photos);
  }

}
