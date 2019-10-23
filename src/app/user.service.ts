import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';


interface user{
    email: string,
    uid: string

}

@Injectable()
export class UserService {
	private user: user

	constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {

	}

	setUser(user: user) {
		this.user = user
	}

	
    read_UserInfo() {
    return this.firestore.collection('users').snapshotChanges();
  	}

	reAuth(email: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password))
	}

	updatePassword(newpassword: string) {
		return this.afAuth.auth.currentUser.updatePassword(newpassword)
	}

	updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
	}

	getUID(): string {
		return this.afAuth.auth.currentUser.uid
	}

}