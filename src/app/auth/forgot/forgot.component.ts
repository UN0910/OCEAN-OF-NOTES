import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  authError: any;
  showSpinner: boolean = false;
  submitted:boolean = false;
  popup: string = null;

  constructor(private auth: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.auth.eventAuthError$.subscribe( data => {
      this.authError = data;
    });
  }

  forgotPassword(frm) {
    // this.auth.resetPassword(frm.value.email);
    this.showSpinner = true;
    this.afAuth.sendPasswordResetEmail(frm.value.email)
    .then(() => {
      this.submitted = true;
      this.popup = "PASSWORD RECOVERY INFORMATION HAS BEEN SENT TO YOUR EMAIL-ID!!!";
      this.showSpinner = false;
    })
    .catch( error => {
      this.auth.eventAuthError.next(error);
    });
  }

  onClose(){
    this.router.navigate(['/authenticate-sign-in']);
  }
}
