import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CrudService } from './../crud.service';


@Component({
  selector: 'app-animated-like',
  templateUrl: './animated-like.component.html',
  styleUrls: ['./animated-like.component.scss'],
  animations: [
    trigger('heart', [
        state('liked', style({
            color: '#e74c3c',
            fill: '#e74c3c',
            opacity: '1',
            transform: 'scale(1.1)'
        })),
        transition('unliked <=> liked', animate('100ms ease-out'))
    ])
  ]
})
export class AnimatedLikeComponent implements OnInit {


  
  public likeState: string = 'heart';
  public iconName: string = 'heart-empty';
  jobPostingID: string;
  jobPostingReference: AngularFirestoreDocument
  mainuser: AngularFirestoreDocument
  sub

  constructor(
    private route: ActivatedRoute, 
    private afs: AngularFirestore,
    private crudService: CrudService,
		private user: UserService
  ) { }

  ngOnInit() {
    this.jobPostingID = this.route.snapshot.paramMap.get('id')
		this.jobPostingReference = this.afs.doc(`JobPostings/${this.jobPostingID}`)
    this.mainuser = this.afs.doc(`users/${this.user.getUID()}`)
  }

  toggleLikeState(){

    if(this.likeState == 'unliked'){
      this.likeState = 'liked';
      this.iconName = 'heart';
      this.mainuser.update({
				likes: firestore.FieldValue.arrayUnion(this.crudService.retrieve_JobPostingsID())
			})
    } else {
      this.likeState = 'unliked';
      this.iconName = 'heart-empty';
      this.mainuser.update({
				likes: firestore.FieldValue.arrayRemove(this.crudService.retrieve_JobPostingsID())
			})
    }

  }

}