import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tabs2Page } from './tabs2.page';

const routes: Routes = [
  {
    path: 'tabs2',
    component: Tabs2Page,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../create-job-posting/create-job-posting.module').then(m => m.CreateJobPostingPageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../view-users/view-users.module').then(m => m.ViewUsersPageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs2/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs2/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tabs2PageRoutingModule {}
