import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ValidateEqualModule } from 'ng-validate-equal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { UploadComponent } from './courses/upload/upload.component';
import { DownloadComponent } from './courses/download/download.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ForgotComponent } from './auth/forgot/forgot.component';

const config = {
  apiKey: "AIzaSyDTZHJOhK9nAmsWTVDAScjwqNaU9bs2k98",
  authDomain: "oon-2021.firebaseapp.com",
  databaseURL: "https://oon-2021-default-rtdb.firebaseio.com",
  projectId: "oon-2021",
  storageBucket: "oon-2021.appspot.com",
  messagingSenderId: "933254159985",
  appId: "1:933254159985:web:c8b2d808cd27c9347d05d0",
  measurementId: "G-YNSKZTG3TV"
};

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    CoursesComponent,
    UploadComponent,
    DownloadComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    MyAccountComponent,
    AlertComponent,
    LoadingComponent,
    DropdownDirective,
    ForgotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    ValidateEqualModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
