import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router, ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  term: string;
  showSpinner: boolean = true;
  notes: Observable<any[]>;
  user = firebase['User'];

  constructor(db: AngularFireDatabase, private route: ActivatedRoute, private auth: AuthService, private router: Router) {
    this.notes = db.list('notes').valueChanges();
    this.notes.subscribe(() => this.showSpinner = false)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.term = params.key;
    });
    this.auth.getUserState()
      .subscribe( user => {
        this.user = user;
      })
  }

  download(fileUrl){
    let splitedUrl = fileUrl.split("/");
    let fileName = splitedUrl[splitedUrl.length - 1].split("?")[0];
      // let downloadAnchorNode = document.createElement('a');
      // downloadAnchorNode.setAttribute('href', fileUrl);
      // downloadAnchorNode.setAttribute('download', fileName);
      // document.body.appendChild(downloadAnchorNode); // required for firefox
      // downloadAnchorNode.click();
      // downloadAnchorNode.remove();
    let save = document.createElement('a');
    save.href = fileUrl;
    save.download = fileName;
    // save.target = '_blank';
    document.body.appendChild(save);
    save.click();
    document.body.removeChild(save);
  }

  unlock(){
    this.router.navigate(['/authenticate-sign-in']);
  }
}
