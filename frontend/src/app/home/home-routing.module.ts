import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/library',
    pathMatch: 'full',
  },
  {
    path: 'home',
    redirectTo: 'home/library',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'library',
        loadChildren: () =>
          import('./library/library.module').then((m) => m.LibraryPageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountPageModule),
      }
    ],
  },
  {
    path: 'manga-create',
    loadChildren: () => import('./manga-create/manga-create.module').then( m => m.MangaCreatePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
