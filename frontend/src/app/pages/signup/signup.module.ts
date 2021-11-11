import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { SignupFormComponent } from './signup-form/signup-form.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SignupPageRoutingModule],
  declarations: [SignupPage, SignupFormComponent],
})
export class SignupPageModule {}
