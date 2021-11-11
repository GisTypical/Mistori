import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { MangaInfoPageRoutingModule } from './manga-info-routing.module';
import { MangaInfoPage } from './manga-info.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MangaInfoPageRoutingModule],
  declarations: [MangaInfoPage, ChapterListComponent, AddChapterComponent],
})
export class MangaInfoPageModule {}
