import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'viewdetails', loadChildren: './viewdetails/viewdetails.module#ViewdetailsPageModule' },
  { path: 'viewdetails/:id', loadChildren: './viewdetails/viewdetails.module#ViewdetailsPageModule' },
  { path: 'contactinfo', loadChildren: './contactinfo/contactinfo.module#ContactinfoPageModule' },
  { path: 'resume', loadChildren: './resume/resume.module#ResumePageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'resume2', loadChildren: './resume2/resume2.module#Resume2PageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'profiledetails', loadChildren: './profiledetails/profiledetails.module#ProfiledetailsPageModule' },
  { path: 'create-job-posting', loadChildren: './create-job-posting/create-job-posting.module#CreateJobPostingPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
