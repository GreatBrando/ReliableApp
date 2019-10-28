import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Router } from '@angular/router' ;
import * as firebase from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { UserService } from './../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    email: string = ""
    fullName: string = ""
    phonenumber: string = ""
    password: string = ""
    cpassword: string = ""

    constructor(
      public afAuth: AngularFireAuth,
      public alert: AlertController,
      public afstore: AngularFirestore,
      public user: UserService,
      public router: Router
      ) { }

    ngOnInit() {
    }

    async register() {
      const { email, fullName, phonenumber, password, cpassword} = this
      if(password !== cpassword){
        this.showAlert("Error!", "Passwords Do Not Match")
        return console.error("Passwords Do Not Match")
      }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      console.log(res)

      this.afstore.doc(`users/${res.user.uid}`).set({
        email,
        fullName,
        phonenumber,
        role: 'User',
        permissions: [],
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })

      this.user.setUser({
        email,
        uid: res.user.uid
      })

      this.showAlert("Success!", "Welcome to the App")
      this.router.navigate(['/tabs/tab1'])
    } catch(error){
      console.dir(error)
      this.showAlert("Error", error.message)
    }
  }

  async showAlert(header: string, message: string){
    const alert = await this.alert.create({
        header,
        message,
        buttons: ["Ok"]
    })
     await alert.present()
  }
}
