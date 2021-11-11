import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChapterCreatePageRoutingModule } from './chapter-create-routing.module';
import { ChapterCreatePage } from './chapter-create.page';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChapterCreatePageRoutingModule,
  ],
  declarations: [ChapterCreatePage, ChapterFormComponent],
})
export class ChapterCreatePageModule {}
