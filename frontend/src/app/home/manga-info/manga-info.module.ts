import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MangaInfoPageRoutingModule } from './manga-info-routing.module';

import { MangaInfoPage } from './manga-info.page';
import { ChapterListComponent } from './chapter-list/chapter-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MangaInfoPageRoutingModule],
  declarations: [MangaInfoPage, ChapterListComponent],
})
export class MangaInfoPageModule {}
