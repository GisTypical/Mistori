import { Component, Input, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/services/chapter.service';
import { Chapter } from 'src/app/shared/Chapter';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent implements OnInit {
  @Input() chapters: Chapter[];

  constructor(private chapterService: ChapterService) {}

  ngOnInit() {}

  openView(chapterid: string) {
    this.chapterService.setChapter(chapterid);
  }
}
