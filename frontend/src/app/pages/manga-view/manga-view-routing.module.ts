import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MangaViewPage } from './manga-view.page';

const routes: Routes = [
  {
    path: '',
    component: MangaViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MangaViewPageRoutingModule {}
