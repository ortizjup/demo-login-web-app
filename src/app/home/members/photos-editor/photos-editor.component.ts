import Swal from 'sweetalert2';
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
        if(photo.isMain){
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
      }
    }
  }

  public setMainPhoto(photo: IPhoto){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe((response: IPhoto[]) => {
      if(response.length){
        this.alertifyService.success("Main photo has been updated!");
        this.photos = response;
        this.getMemberPhotoChange.emit(photo.url);
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      }
    }, error => {
      this.alertifyService.error(error);
    });
  } 

  public deletePhoto(photo: IPhoto){
    Swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      text: 'You want be able to rever changes!',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        console.log(photo.id);
        console.log(this.authService.decodedToken.nameid);
        this.userService.deletePhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === photo.id), 1);
          this.alertifyService.success("Photo has been deleted!");
        }, error => {
          this.alertifyService.error(error);
        });
      }
    });
  }
}
