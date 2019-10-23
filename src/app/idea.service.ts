import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
 
export interface Idea {
  id?: string,
  jobTitle: string,
  companyName: string,
  jobAddress: string,
  jobCity: string,
  jobState: string,
  jobPosition: string,
  jobDescription: string,
  minSalary: number,
  maxSalary: number
}
 
@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideas: Observable<Idea[]>;
  private ideaCollection: AngularFirestoreCollection<Idea>;
 
  constructor(private afs: AngularFirestore) {
    this.ideaCollection = this.afs.collection<Idea>('JobPostings');
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getIdeas(): Observable<Idea[]> {
    return this.ideas;
  }
 
  getIdea(id: string): Observable<Idea> {
    return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }
 
  addIdea(idea: Idea): Promise<DocumentReference> {
    return this.ideaCollection.add(idea);
  }

  updateIdea(idea: Idea): Promise<void> {
    return this.ideaCollection.doc(idea.id).update({ jobTitle: idea.jobTitle, companyName: idea.companyName, jobAddress: idea.jobAddress, jobCity: idea.jobCity, jobState: idea.jobState, jobPosition: idea.jobPosition, jobDescription: idea.jobDescription, minSalary: idea.minSalary, maxSalary: idea.maxSalary });
  }
 
  deleteIdea(id: string): Promise<void> {
    return this.ideaCollection.doc(id).delete();
  }
}