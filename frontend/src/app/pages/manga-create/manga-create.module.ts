import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MangaCreatePageRoutingModule } from './manga-create-routing.module';

import { MangaCreatePage } from './manga-create.page';
import { MangaFormComponent } from './manga-form/manga-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MangaCreatePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [MangaCreatePage, MangaFormComponent],
})
export class MangaCreatePageModule {}
