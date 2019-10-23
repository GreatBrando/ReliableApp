import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';





@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  mainuser: AngularFirestoreDocument
  fullName: string;
  email: string;
  phonenumber: string;

  constructor(
      private afs: AngularFirestore,
      private user: UserService,
      public router: Router
  ) {}
  
  ngOnInit(){
       this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
       this.mainuser.valueChanges().subscribe(event => {
			 this.fullName = event.fullName
       this.email = event.email
       this.phonenumber = event.phonenumber
       console.log(event)
      }) 
  }

  async ProfilePageFunction() {
      this.router.navigate(['/profiledetails'])
  }

}
