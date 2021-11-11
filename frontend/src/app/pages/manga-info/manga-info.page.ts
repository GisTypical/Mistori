import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../services/manga.service';
import { Manga } from '../../shared/Manga';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-manga-info',
  templateUrl: './manga-info.page.html',
  styleUrls: ['./manga-info.page.scss'],
})
export class MangaInfoPage implements OnInit {
  mangaID: string;
  cover: string | File;
  name: string;
  author: string;
  status: string;
  chapters: any;

  constructor(
    private mangaService: MangaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('mangaID')) {
        return;
      }

      const mangaID = paramMap.get('mangaID');
      this.mangaID = mangaID;
    });
  }

  ionViewDidEnter() {
    this.mangaService.getMangaID(this.mangaID).subscribe((manga) => {
      this.cover = manga.cover;
      this.name = manga.name;
      this.author = manga.author;
      this.status = manga.status.toUpperCase();
      this.chapters = manga.chapters;
    });
  }
}
