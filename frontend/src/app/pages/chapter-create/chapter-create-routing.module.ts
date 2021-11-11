import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChapterCreatePage } from './chapter-create.page';

const routes: Routes = [
  {
    path: '',
    component: ChapterCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChapterCreatePageRoutingModule {}
