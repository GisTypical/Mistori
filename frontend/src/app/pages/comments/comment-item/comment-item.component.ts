import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem: Comment
  showResponseForm: boolean = false
  text: string

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.showResponseForm = !this.showResponseForm
  }

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
