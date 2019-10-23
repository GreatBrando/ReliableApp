import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateJobPostingPage } from './create-job-posting.page';

const routes: Routes = [
  {
    path: '',
    component: CreateJobPostingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateJobPostingPage]
})
export class CreateJobPostingPageModule {}
