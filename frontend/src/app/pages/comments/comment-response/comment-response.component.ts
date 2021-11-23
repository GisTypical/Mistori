import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comment-response',
  templateUrl: './comment-response.component.html',
  styleUrls: ['./comment-response.component.scss'],
})
export class CommentResponseComponent implements OnInit {
  @Input() commentItem: Comment
  showResponseForm: boolean = false

  onClick() {
    this.showResponseForm = !this.showResponseForm
  }

  constructor() {}

  ngOnInit() {}

}
