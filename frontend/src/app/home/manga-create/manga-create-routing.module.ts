import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangaCreatePage } from './manga-create.page';

const routes: Routes = [
  {
    path: '',
    component: MangaCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaCreatePageRoutingModule {}
