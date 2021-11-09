import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateMangaPage } from './create-manga.page';

const routes: Routes = [
  {
    path: '',
    component: CreateMangaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateMangaPageRoutingModule {}
