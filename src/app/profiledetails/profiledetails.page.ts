import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';



@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.page.html',
  styleUrls: ['./profiledetails.page.scss'],
})
export class ProfiledetailsPage implements OnInit {

  mainuser: AngularFirestoreDocument
  sub
  email
  fullName: string;
  address: string;
  city: string;
  state: string;
  phonenumber: string;


  constructor(private afs: AngularFirestore, private user: UserService) { }

  ngOnInit() {
    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
       this.mainuser.valueChanges().subscribe(event => {
			 this.fullName = event.fullName
       this.address = event.address
       this.city = event.city
       this.state = event.state
       this.email = event.email
       this.phonenumber = event.phonenumber
       console.log(event)
      }) 
  }

  async saveProfileInfo(){
    const { fullName, address, city, state, phonenumber} = this

    try{

    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
		this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.fullName = event.fullName
			this.address = event.address
      this.city = event.city
      this.state = event.state
      this.phonenumber = event.phonenumber
		})  

   this.afs.doc(`users/${this.user.getUID()}`).update({
        fullName,
        address,
        city,
        state,
        phonenumber,
      })

    } catch(error){
      console.dir(error)
    }
  }

}     


