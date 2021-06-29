import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  keyword:any;
  contactForm: FormGroup;
  submitted:boolean = false;
  popup: string = null;

  constructor(private router: Router, private db: AngularFireDatabase) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'message': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    const itemRef = this.db.list('contact');
    itemRef.push(this.contactForm.value);
    this.contactForm.reset();
    this.submitted = true;
    this.popup = "Feedback form has been submitted!!!";
  }

  goToDownload(){
    this.router.navigate(["/courses/download"],{queryParams:{key:this.keyword}});
  }
  getKeyword(event){
    this.keyword = event.target.value
  }

  onClose(){
    this.submitted = false;
  }
}
