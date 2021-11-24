import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
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

  constructor(private commentService: CommentService) { }

  ngOnInit() {}

  onClick() {
    this.showResponseForm = !this.showResponseForm
  }

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
