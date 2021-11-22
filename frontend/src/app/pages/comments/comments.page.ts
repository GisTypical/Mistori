import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/shared/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  chapterID: string
  comments: Comment[] = []

  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('chapterID')) {
        return;
      }

      const chapterID = paramMap.get('chapterID');
      this.chapterID = chapterID
    });
  }

  submitComment(comment: Comment) {
    this.commentService.submitComment(comment, this.chapterID).subscribe(comment => {
      const commentYear = new Date(comment.date).getFullYear()
      const commentMonth = new Date(comment.date).getMonth()
      const commentDay = new Date(comment.date).getDate()
      const commentHour = new Date(comment.date).getHours()
      const commentMinute = new Date(comment.date).getMinutes()
      const commentSecond = new Date(comment.date).getSeconds()

      comment.date = `${commentMonth}/${commentDay}/${commentYear}-${commentHour}:${commentMinute}:${commentSecond}`

      this.comments.push(comment)
    })
  }

}
