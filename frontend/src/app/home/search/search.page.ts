import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  mangas: Manga[];

  constructor(private mangaService: MangaService) {
    this.mangaService
      .getAllMangas()
      .subscribe((mangas) => (this.mangas = mangas.mangas));
  }

  ngOnInit() {}
}
