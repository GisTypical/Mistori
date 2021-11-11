import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountPageRoutingModule } from './account-routing.module';
import { AccountPage } from './account.page';
import { AddMangaComponent } from './add-manga/add-manga.component';
import { MangaItemComponent } from './manga-item/manga-item.component';
import { NotloggedComponent } from './notlogged/notlogged.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AccountPageRoutingModule],
  declarations: [AccountPage, UserComponent, NotloggedComponent, AddMangaComponent, MangaItemComponent],
})
export class AccountPageModule {}
