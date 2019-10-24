import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router' 

import { AlertController } from '@ionic/angular'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = ""
  password: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  async login() {
    const { email, password } = this
    try{
        const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        this.router.navigate(['/tabs/tab1'])
    } catch(err) {
      console.dir(err)
      if(err.code === "auth/invalid-email"){
          console.log("email not found")
          this.showAlert("Error", "Email not Found")
      }
      if(err.code == "auth/wrong-password"){
        console.log("password not found")
        this.showAlert("Error", "The password is invalid")
      }
      if(err.code == "auth/user-not-found"){
        console.log("password not found")
        this.showAlert("Error", "Account not found. Please Register.")
      }
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
