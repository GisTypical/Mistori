import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comment-response',
  templateUrl: './comment-response.component.html',
  styleUrls: ['./comment-response.component.scss'],
})
export class CommentResponseComponent implements OnInit {
  @Input() commentItem: Comment
  @Output() onSubmitResponse: EventEmitter<Comment> = new EventEmitter()
  showResponseForm: boolean = false
  text: string

  onClick() {
    this.showResponseForm = !this.showResponseForm
  }

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    const response = {
      'username': this.commentItem.username,
      'text': this.text,
      'date': this.commentItem.date,
      'parent': {
        'username': this.commentItem.username,
        'text': this.commentItem.text
      }
    }

    console.log(response)

    this.commentItem.children.push(response)

    this.text = ''
    this.showResponseForm = false
  }

}
