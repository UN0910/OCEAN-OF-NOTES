import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth/auth.guard';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CoursesComponent } from './courses/courses.component';
import { DownloadComponent } from './courses/download/download.component';
import { UploadComponent } from './courses/upload/upload.component';
import { HomeComponent } from './home/home.component';
import { MyAccountComponent } from './my-account/my-account.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/download', component: DownloadComponent},
  {path: 'courses/upload', component: UploadComponent, canActivate: [AuthGuard]},
  {path: 'authenticate', redirectTo: '/authenticate-sign-in'},
  {path: 'authenticate-sign-in', component: LoginComponent},
  {path: 'authenticate-sign-up', component: RegisterComponent},
  {path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
