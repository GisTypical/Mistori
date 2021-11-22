import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralModule } from 'src/app/shared/general/general.module';
import { LibraryPageRoutingModule } from './library-routing.module';
import { LibraryPage } from './library.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibraryPageRoutingModule,
    GeneralModule,
  ],
  declarations: [LibraryPage],
})
export class LibraryPageModule {}
