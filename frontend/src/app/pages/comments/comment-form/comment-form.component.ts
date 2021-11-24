import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Output() onSubmitComment: EventEmitter<string> = new EventEmitter()
  @Input() showForm: boolean
  @Input() margin_left: string
  @Input() text: string

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.onSubmitComment.emit(this.text)
    this.text = ''
  }

  onInput() {
    return this.text == undefined || this.text == ''
  }

}
