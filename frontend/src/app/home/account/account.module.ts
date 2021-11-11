import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralModule } from 'src/app/shared/general/general.module';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { NotloggedComponent } from './notlogged/notlogged.component';
import { AddMangaComponent } from './user/add-manga/add-manga.component';
import { UserCardComponent } from './user/user-card/user-card.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    GeneralModule,
  ],
  declarations: [
    AccountPage,
    UserComponent,
    NotloggedComponent,
    UserCardComponent,
    AddMangaComponent,
  ],
})
export class AccountPageModule {}
