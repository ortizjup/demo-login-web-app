import { PhotosEditorComponent } from './home/members/photos-editor/photos-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { StateResolver } from './resolvers/state-resolver';
import { CountryResolver } from './resolvers/country-resolver';
import { CityResolver } from './resolvers/city-resolver';
import { MemberEditComponent } from './home/members/member-edit/member-edit.component';
import { MemberDetailComponent } from './home/members/member-detail/member-detail.component';
import { MemberCardComponent } from './home/members/member-card/member-card/member-card.component';
import { RouterModule } from '@angular/router';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule, CustomHammerConfig } from 'ngx-gallery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './layout/nav/nav.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MemberListsComponent } from './home/members/member-lists/member-lists.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { MemberDetailResolver } from './resolvers/member-detail-resolver';
import { MemberEditResolver } from './resolvers/member-edit-resolver'
import { MemberListResolver } from './resolvers/member-list-resolver';
import { FileSelectDirective, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimeAgoPipe } from 'time-ago-pipe';

export function tokenGetter(){
   return localStorage.getItem('token');
}

export class CustomHamerConfig extends HammerGestureConfig{
   overrides = {
      pinch: {enable: false},
      rotate: {enable: false}
   };
}

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      MemberListsComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotosEditorComponent,
      TimeAgoPipe
   ],
   imports: [
      BsDropdownModule.forRoot(),
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      FileUploadModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config:{
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      }),
      TabsModule.forRoot(),
      NgxGalleryModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot()
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      CityResolver, 
      CountryResolver,
      StateResolver,
      PreventUnsavedChanges,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
