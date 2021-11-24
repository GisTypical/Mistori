import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Output() onSubmitComment: EventEmitter<Comment> = new EventEmitter();
  text: string

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    const comment = {
      text: this.text
    }

    this.onSubmitComment.emit(comment)
    this.text = ''
  }

  onInput() {
    const validation = (this.text == undefined || this.text == '') ? true : false
    return validation
  }

}
