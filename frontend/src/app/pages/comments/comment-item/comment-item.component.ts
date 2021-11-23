import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem: Comment
  showResponseForm: boolean = false

  constructor() { }

  onClick() {
    this.showResponseForm = !this.showResponseForm
  }

  ngOnInit() {}

}
