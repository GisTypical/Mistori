import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangaInfoPage } from './manga-info.page';

const routes: Routes = [
  {
    path: '',
    component: MangaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaInfoPageRoutingModule {}
