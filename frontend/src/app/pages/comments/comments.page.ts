import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('chapterID')) {
        return;
      }

      const chapterID = paramMap.get('chapterID');
      this.chapterID = chapterID
    });
  }

  formatDate(children: Comment[]){
    for (let j = 0; j < children.length; j++) {
      const childrenYear = new Date(children[j].date).getFullYear()
      const childrenMonth = new Date(children[j].date).getMonth()
      const childrenDay = new Date(children[j].date).getDate()
      const childrenHour = new Date(children[j].date).getHours()
      const childrenMinute = new Date(children[j].date).getMinutes()

      children[j].date = `${childrenMonth}/${childrenDay}/${childrenYear} - ${childrenHour}:${childrenMinute}`

      this.formatDate(children[j].children)
    }

  }

  ionViewDidEnter() {
    this.commentService.getComments(this.chapterID).subscribe(data => {
      for (let i = 0; i < data.comments.length; i++) {
        const commentYear = new Date(data.comments[i].date).getFullYear()
        const commentMonth = new Date(data.comments[i].date).getMonth()
        const commentDay = new Date(data.comments[i].date).getDate()
        const commentHour = new Date(data.comments[i].date).getHours()
        const commentMinute = new Date(data.comments[i].date).getMinutes()

        this.formatDate(data.comments[i].children)

        data.comments[i].date = `${commentMonth}/${commentDay}/${commentYear} - ${commentHour}:${commentMinute}`
      }

      this.comments = data.comments
    })
  }

  // submitComment(comment: Comment) {
  //   this.commentService.submitComment(comment, this.chapterID).subscribe(comment => {
  //     const commentYear = new Date(comment.date).getFullYear()
  //     const commentMonth = new Date(comment.date).getMonth()
  //     const commentDay = new Date(comment.date).getDate()
  //     const commentHour = new Date(comment.date).getHours()
  //     const commentMinute = new Date(comment.date).getMinutes()

  //     comment.date = `${commentMonth}/${commentDay}/${commentYear}-${commentHour}:${commentMinute}`
  //     this.submitResponse(comment)
  //   })
  // }

  submitComment(text: string) {
    const comment = { 'text': text }
    this.commentService.submitComment(comment, this.chapterID).subscribe(comment => {
      const commentYear = new Date(comment.date).getFullYear()
      const commentMonth = new Date(comment.date).getMonth()
      const commentDay = new Date(comment.date).getDate()
      const commentHour = new Date(comment.date).getHours()
      const commentMinute = new Date(comment.date).getMinutes()

      comment.date = `${commentMonth}/${commentDay}/${commentYear}-${commentHour}:${commentMinute}`
      this.submitResponse(comment)
    })

  }

  submitResponse(response: Comment) {
    this.commentService.getComments(this.chapterID).subscribe(data => {
      for (let i = 0; i < data.comments.length; i++) {
        const commentYear = new Date(data.comments[i].date).getFullYear()
        const commentMonth = new Date(data.comments[i].date).getMonth()
        const commentDay = new Date(data.comments[i].date).getDate()
        const commentHour = new Date(data.comments[i].date).getHours()
        const commentMinute = new Date(data.comments[i].date).getMinutes()

        this.formatDate(data.comments[i].children)

        data.comments[i].date = `${commentMonth}/${commentDay}/${commentYear} - ${commentHour}:${commentMinute}`
      }

      this.comments = data.comments
    })

  }

}
