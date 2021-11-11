import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: '',
    children: [
      {
        path: 'manga/create',
        loadChildren: () => import('./home/manga-create/manga-create.module').then(m => m.MangaCreatePageModule)
      },
      {
        path: 'manga/:mangaID',
        loadChildren: () => import('./home/manga-info/manga-info.module').then(m => m.MangaInfoPageModule)
      }
    ]
  },
  { path: '**', redirectTo: 'home/library', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
