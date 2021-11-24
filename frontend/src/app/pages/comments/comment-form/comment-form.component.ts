import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  // @Output() onSubmitComment: EventEmitter<Comment> = new EventEmitter();
  @Output() onSubmitComment: EventEmitter<string> = new EventEmitter()
  text: string

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    // const comment = {
    //   text: this.text
    // }

    this.onSubmitComment.emit(this.text)
    this.text = ''
  }

  onInput() {
    return this.text == undefined || this.text == ''
  }

}
