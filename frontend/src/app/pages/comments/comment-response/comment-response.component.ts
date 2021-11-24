import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
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

  constructor(private commentService: CommentService) {}

  ngOnInit() {}

  onSubmit() {
    const response = {
      'text': this.text,
      'parent_id': this.commentItem.id
    }

    this.commentService.submitComment(response, this.commentItem.chapter_id).subscribe(comment => {
      console.log(comment)
      const commentYear = new Date(comment.date).getFullYear()
      const commentMonth = new Date(comment.date).getMonth()
      const commentDay = new Date(comment.date).getDate()
      const commentHour = new Date(comment.date).getHours()
      const commentMinute = new Date(comment.date).getMinutes()

      comment.date = `${commentMonth}/${commentDay}/${commentYear}-${commentHour}:${commentMinute}`

      this.commentItem.children.push(comment)
    })

    this.text = ''
    this.showResponseForm = false
  }

}
