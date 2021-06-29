import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  authenticate:boolean = false;
  popup:string = null;
  popup1: string = null;

  constructor(private router: Router, private auth: AuthGuard) { }

  ngOnInit(): void {}

  onClose(){
    this.authenticate = false;
    this.router.navigate(["/authenticate-sign-in"]);
  }

  goToUpload(){
    this.auth.canActivate().subscribe(res =>{
      if(res){
        this.router.navigate(['/courses/upload']);
      } else{
        this.authenticate = true;
        this.popup ="Access Denied, Login is Required to Access This Page!" ;
        this.popup1 = "Please authenticate yourself first!";
      }
    });
  }
}
