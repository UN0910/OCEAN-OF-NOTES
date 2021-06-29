import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  navbarOpen = false;
  user = firebase['User'];

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
  }

  login() {
    this.router.navigate(['/authenticate-sign-in']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/authenticate-sign-in']);
  }

  register() {
    this.router.navigate(['/authenticate-sign-up']);
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
}
