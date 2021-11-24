import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/shared/Comment';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem: Comment
  @Output() onSubmitResponse: EventEmitter<Comment> = new EventEmitter()
  showResponseForm: boolean = false
  text: string

  constructor(private commentService: CommentService, private popoverController: PopoverController) { }

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
      this.onSubmitResponse.emit(comment)
    })
    this.text = ''
    this.showResponseForm = false
  }


  submitResponse(response: Comment) {
    this.onSubmitResponse.emit(response)
  }


  onInput() {
    const validation = (this.text == undefined || this.text == '') ? true : false
    return validation
  }

}