import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user = firebase['User'];

  constructor(private auth:AuthService, private router: Router){}

  canActivate(): Observable<any> {
    return this.auth.getUserState().pipe(map(user => {
      if(user){
        return true;
      }
      return false;
    }))
  }
}
