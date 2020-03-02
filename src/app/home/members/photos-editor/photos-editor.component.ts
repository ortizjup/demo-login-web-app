import { AlertifyService } from './../../../services/alertify.service';
import { IUser } from './../../../models/IUser';
import { UserService } from 'src/app/services/user.service';
import { IPhoto } from './../../../models/IPhoto';
import { AuthService } from './../../../services/auth.service';
import { environment } from './../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-photos-editor',
  templateUrl: './photos-editor.component.html',
  styleUrls: ['./photos-editor.component.scss']
})
export class PhotosEditorComponent implements OnInit {

  @Input() photos: IPhoto[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  apiBaseUrl: string = environment.baseUrl;

  constructor(private authService: AuthService
              ,private userService: UserService
              ,private alertifyService: AlertifyService) {
  }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.apiBaseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });
    
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false };
    
    this.uploader.onSuccessItem = (item, response, status, headers) => {
    
    if (response) {
        const res: IPhoto = JSON.parse(response);
        
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
       
        this.photos.push(photo);
      }
    }
  }

  public setMainPhoto(photo: IPhoto){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe((response: IPhoto[]) => {
      if(response.length){
        console.log(response);
        this.alertifyService.success("Main photo has been updated!")
        this.photos = response;
        this.getMemberPhotoChange.emit(photo.url);
      }
    }, error => {
      this.alertifyService.error(error);
    });
  } 
}
