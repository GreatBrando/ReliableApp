import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { CrudService } from './../crud.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  jobCollection: any
  public jobPostingsList: any[];
  public loadedjobPostingsList: any[];
  passided

  jobPostings: any;
  loadedjobPostings: any;
  hasVerifiedEmail = true;

  constructor(
    public afAuth: AngularFireAuth,
    private toastController: ToastController, 
    public loadingController: LoadingController,
    private crudService: CrudService,
    private firestore: AngularFirestore,
    public alertController: AlertController
    
    ) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        setInterval(() => {
       this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
        }, 1000);
      }
     });
    }

   ngOnInit() {
     
     this.crudService.read_JobPostings().subscribe(data => {

      this.jobPostings = data.map(jobPostings => {
        return {
          id: jobPostings.payload.doc.id,
          isEdit: false,
          jobTitle: jobPostings.payload.doc.data()['jobTitle'],
          companyName: jobPostings.payload.doc.data()['companyName'],
          jobCity: jobPostings.payload.doc.data()['jobCity'],
          jobState: jobPostings.payload.doc.data()['jobState'],
          minSalary: jobPostings.payload.doc.data()['minSalary'],
          maxSalary: jobPostings.payload.doc.data()['maxSalary'],
          jobPosition: jobPostings.payload.doc.data()['jobPosition'],
        };
      })
      console.log(this.jobPostings);

    });

        


      this.firestore.collection(`JobPostings`).valueChanges({ idField: 'eventId' })
      .subscribe(jobPostingsList => {
        this.jobPostingsList = jobPostingsList;
        this.loadedjobPostingsList = jobPostingsList;
        console.log(this.jobPostingsList);
    });
  }

  initializeItems(): void {
  this.jobPostingsList = this.loadedjobPostingsList;
  }

  filterList(evt) {
  this.initializeItems();

  const searchTerm = evt.srcElement.value;

  if (!searchTerm) {
    return;
  }

  this.jobPostingsList = this.jobPostingsList.filter(currentJob => {
    if (currentJob.jobTitle && searchTerm) {
      if (currentJob.jobTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
}
   
   sendVerificationEmail(){
      this.presentToast('Verification email has been sent', false, 'bottom', 1000);
      this.afAuth.auth.currentUser.sendEmailVerification();
   }


   async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }


}


