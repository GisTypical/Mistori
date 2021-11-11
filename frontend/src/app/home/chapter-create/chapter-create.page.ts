import { Component, OnInit } from '@angular/core';
import { Chapter } from 'src/app/shared/Chapter';

@Component({
  selector: 'app-chapter-create',
  templateUrl: './chapter-create.page.html',
  styleUrls: ['./chapter-create.page.scss'],
})
export class ChapterCreatePage implements OnInit {
  constructor() {}

  ngOnInit() {}

  submitChapter(chapter: Chapter) {}
}
