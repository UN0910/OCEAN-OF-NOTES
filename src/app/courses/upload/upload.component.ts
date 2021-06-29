import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  uploadForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadURL: string;
  submitted:boolean = false;
  popup: string = null;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private router: Router){}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'caption': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'fileUrl': new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    const itemRef = this.db.list('notes');
    itemRef.push(this.uploadForm.value);
    this.uploadForm.reset();
    this.downloadURL = "";
    this.uploadPercent = null;
    this.submitted = true;
    this.popup = "Notes-upload form has been submitted!!!";
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = (file.name);
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges(), '%';
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
          let downloadURLObs = fileRef.getDownloadURL();
          downloadURLObs.subscribe(res => {
            if(res) {
              this.downloadURL = res;
              this.uploadForm.controls.fileUrl.setValue(this.downloadURL);
            }
          })
        })
     ).subscribe()
  }

  onClose(){
    this.submitted = false;
    this.router.navigate(["/courses"]);
  }
}
