import { Component, Input, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss'],
})
export class AddChapterComponent implements OnInit {
  @Input() mangaID: string;

  constructor(private mangaService: MangaService) {}

  ngOnInit() {}

  onCreateChapter() {
    this.mangaService.setManga(this.mangaID);
  }
}
