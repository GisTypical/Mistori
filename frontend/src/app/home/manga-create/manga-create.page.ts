import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.page.html',
  styleUrls: ['./manga-create.page.scss'],
})
export class MangaCreatePage implements OnInit {

  constructor(private mangaService: MangaService) { }

  ngOnInit() {
  }

  submitManga(manga: Manga) {
    this.mangaService.submitManga(manga)
  }

}
