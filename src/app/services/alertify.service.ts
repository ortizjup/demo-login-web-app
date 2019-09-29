import { Injectable } from '@angular/core';
import * as alerify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(message: string,  okCallBack: () => any){
  alerify.confirm(message, (e: any) => {
    if(e){
      okCallBack();
    }else{
      
    }
  });
}

success(message: string){
  alerify.success(message);
}

error(message: string){
  alerify.error(message);
}

warning(message: string){
  alerify.warning(message);
}


notificationMessage(message: string){
  alerify.message(message);
}

}
