import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddChapterComponent } from './add-chapter/add-chapter.component';
import { LibraryPageRoutingModule } from './library-routing.module';
import { LibraryPage } from './library.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LibraryPageRoutingModule],
  declarations: [LibraryPage, AddChapterComponent],
})
export class LibraryPageModule {}
