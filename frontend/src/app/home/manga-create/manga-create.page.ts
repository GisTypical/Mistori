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
    // console.log('Manga Create')
    // console.table([manga.name, manga.author, manga.date, manga.status, manga.description])
    this.mangaService.submitManga(manga)
  }

}
