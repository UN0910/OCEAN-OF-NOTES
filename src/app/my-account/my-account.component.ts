import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user = firebase['User'];
  showSpinner: boolean = false;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
  }

  logout() {
    this.showSpinner = true;
    this.auth.logout();
    this.router.navigate(['/authenticate-sign-in']);
  }
}
