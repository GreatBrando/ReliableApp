import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.page.html',
  styleUrls: ['./view-users.page.scss'],
})
export class ViewUsersPage implements OnInit {

    public userProfilesList: any[];
    public loadeduserProfilesList: any[];



  constructor(    
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
     this.firestore.collection(`users`).valueChanges({ idField: 'eventId' })
      .subscribe(userProfilesList => {
        this.userProfilesList = userProfilesList;
        this.loadeduserProfilesList = userProfilesList;
        console.log(this.userProfilesList);
    });
  }

  initializeItems(): void {
  this.userProfilesList = this.loadeduserProfilesList;
  }

  filterList(evt) {
  this.initializeItems();

  const searchTerm = evt.srcElement.value;

  if (!searchTerm) {
    return;
  }

  this.userProfilesList = this.userProfilesList.filter(currentName => {
    if (currentName.fullName && searchTerm) {
      if (currentName.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}

}
