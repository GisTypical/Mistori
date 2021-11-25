import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../../shared/Comment'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() comments: Comment[]
  @Output() onSubmitResponse = new EventEmitter()

  constructor() { }

  ngOnInit() {}

  submitResponse() {
    this.onSubmitResponse.emit()
  }

}
