import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface userIdea {
  id?: string,
  fullName: string,
  email: string,
  phonenumber: string

}

@Injectable({
  providedIn: 'root'
})
export class userdisplayService {
  private userIdeas: Observable<userIdea[]>;
  private userIdeaCollection: AngularFirestoreCollection<userIdea>;

   constructor(private afs: AngularFirestore) {
    this.userIdeaCollection = this.afs.collection<userIdea>('users');
    this.userIdeas = this.userIdeaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getuserIdeas(): Observable<userIdea[]> {
    return this.userIdeas;
  }
 
  getuserIdea(id: string): Observable<userIdea> {
    return this.userIdeaCollection.doc<userIdea>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }

}
 