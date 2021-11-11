import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { MangaViewPageRoutingModule } from './manga-view-routing.module';
import { MangaViewPage } from './manga-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MangaViewPageRoutingModule,
    SwiperModule,
  ],
  declarations: [MangaViewPage],
})
export class MangaViewPageModule {}
