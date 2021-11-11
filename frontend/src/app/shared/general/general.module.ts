import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaListComponent } from '../manga-list/manga-list.component';
import { MangaItemComponent } from '../manga-item/manga-item.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MangaListComponent, MangaItemComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [MangaListComponent, MangaItemComponent],
})
export class GeneralModule {}
