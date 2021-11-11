import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.scss'],
})
export class ChapterFormComponent implements OnInit {
  @ViewChild('chapterForm') form: ElementRef<HTMLFormElement>;
  @Output() newChapter = new EventEmitter<FormData>();
  name: string
  date: string

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    const formData = new FormData(this.form.nativeElement);
    this.newChapter.emit(formData);
    this.name = ''
    this.date = ''
  }
}
