import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: '',
    children: [
      {
        path: 'manga/create',
        loadChildren: () =>
          import('./pages/manga-create/manga-create.module').then(
            (m) => m.MangaCreatePageModule
          ),
      },
      {
        path: 'manga/:mangaID',
        loadChildren: () =>
          import('./pages/manga-info/manga-info.module').then(
            (m) => m.MangaInfoPageModule
          ),
      },
      {
        path: 'manga-create',
        loadChildren: () =>
          import('./pages/manga-create/manga-create.module').then(
            (m) => m.MangaCreatePageModule
          ),
      },
      {
        path: 'manga-info',
        loadChildren: () =>
          import('./pages/manga-info/manga-info.module').then(
            (m) => m.MangaInfoPageModule
          ),
      },
      {
        path: 'chapter/create',
        loadChildren: () =>
          import('./pages/chapter-create/chapter-create.module').then(
            (m) => m.ChapterCreatePageModule
          ),
      },
      {
        path: 'manga-view',
        loadChildren: () =>
          import('./pages/manga-view/manga-view.module').then(
            (m) => m.MangaViewPageModule
          ),
      },
      {
        path: 'comment/:chapterID',
        loadChildren: () => import('./pages/comments/comments.module').then((m) => m.CommentsPageModule)
      }
    ],
  },
  { path: '**', redirectTo: 'home/library', pathMatch: 'full' },
  {
    path: 'comments',
    loadChildren: () => import('./pages/comments/comments.module').then( m => m.CommentsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
