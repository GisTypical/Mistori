import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';

import { CommentsPage } from './comments.page';
import { CommentFormComponent } from './comment-form/comment-form.component'
import { CommentItemComponent } from './comment-item/comment-item.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentResponseComponent } from './comment-response/comment-response.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CommentsPage,
    CommentFormComponent,
    CommentItemComponent,
    CommentListComponent,
    CommentResponseComponent
  ]
})
export class CommentsPageModule {}
