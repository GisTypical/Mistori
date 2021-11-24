import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/shared/Comment';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() commentItem: Comment
  @Output() onSubmitResponse = new EventEmitter()
  showResponseForm: boolean = false
  showUpdateForm: boolean = false
  text: string

  constructor(private commentService: CommentService, private popoverController: PopoverController) { }

  ngOnInit() {}

  // FORM VALIDATIONS
  onClick() {
    this.text = ''
    this.showResponseForm = !this.showResponseForm
  }

  onClose() {
    this.text = ''
    this.showUpdateForm = !this.showUpdateForm
  }

  onInput() {
    return this.text == undefined || this.text == ''
  }


  // REQUESTS
  onSubmit(text: string) {
    const response = { 'text': text, 'parent_id': this.commentItem.id }
    this.commentService.submitComment(response, this.commentItem.chapter_id).subscribe(comment => {
      this.onSubmitResponse.emit()
    })
    this.text = ''
    this.showResponseForm = false
  }

  onUpdate(text: string) {
    const comment = { 'text': text }
    this.commentService.updateComment(comment, this.commentItem.id).subscribe(comment => {
      this.onSubmitResponse.emit()
    })
    this.showUpdateForm = !this.showUpdateForm
  }

  submitResponse() {
    this.onSubmitResponse.emit()
  }

  // POPOVER
  async presentPopover(ev: any) {
    const popOver = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true,
      componentProps: {
        'update': {
          'id': this.commentItem.id,
          'text': this.commentItem.text
        },
        'delete': this.commentItem.id
      }
    })

    popOver.onDidDismiss().then(({data}) => {
      console.log(data)
      this.showUpdateForm = true
      this.text = data.text
    })

    return await popOver.present()
  }

}
