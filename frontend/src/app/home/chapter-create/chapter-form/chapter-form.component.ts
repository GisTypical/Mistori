import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-chapter-form',
  templateUrl: './chapter-form.component.html',
  styleUrls: ['./chapter-form.component.scss'],
})
export class ChapterFormComponent implements OnInit {
  @ViewChild('chapterForm') form: ElementRef<HTMLFormElement>;

  constructor(private chapterService: ChapterService) {}

  ngOnInit() {}

  onSubmit() {
    const formData = new FormData(this.form.nativeElement);
    // cambiar por el mangaId
    formData.append('mangaId', '13fc7c1d-a63d-4f8c-91e5-cee835541613');
    this.chapterService.createChapter(formData).subscribe();
  }
}
