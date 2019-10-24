import { Injectable } from '@angular/core';
 
import { AngularFirestore } from '@angular/fire/firestore';
 
@Injectable({
  providedIn: 'root'
})
export class CrudService {
 
  constructor(
    private firestore: AngularFirestore
  ) { }
 
 
  create_NewJobPostings(record) {
    return this.firestore.collection('JobPostings').add(record);
  }
 
  read_JobPostings() {
    return this.firestore.collection('JobPostings').snapshotChanges();
  }
 
  update_JobPostings(recordID,record){
    this.firestore.doc('JobPostings/' + recordID).update(record);
  }
 
  delete_JobPostings(record_id) {
    this.firestore.doc('JobPostings/' + record_id).delete();
  }
  retrieve_JobPostingsID(){
      
  }

}
 