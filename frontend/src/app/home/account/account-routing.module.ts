import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'create-manga',
    loadChildren: () => import('./create-manga/create-manga.module').then( m => m.CreateMangaPageModule)
  },
  {
    path: '',
    children: [
      {
        path: 'manga/create',
        loadChildren: () => import('./create-manga/create-manga.module').then(m => m.CreateMangaPageModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
