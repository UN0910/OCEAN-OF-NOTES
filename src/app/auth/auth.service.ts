import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;
  alert: string = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }

  login( email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          this.router.navigate(['/my-account']);
        }
      })
  }

  createUser(user) {
    this.afAuth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile( {displayName: user.username} );

        this.insertUserData(userCredential)
        .then(() => {
          this.router.navigate(['/my-account']);
        });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  resetPassword(email: string){
    this.afAuth.sendPasswordResetEmail(email)
    .then(() => {
      window.alert("PASSWORD RECOVERY INFORMATION HAS BEEN SENT TO YOUR EMAIL-ID!!!");
      this.router.navigate(['/authenticate-sign-in']);
    })
    .catch( error => {
      this.eventAuthError.next(error);
    });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      username: this.newUser.username
    })
  }

  logout() {
    return this.afAuth.signOut();
  }

}
