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
  searchValue: string

  constructor(private mangaService: MangaService) {
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.mangaService
      .getAllMangas()
      .subscribe((mangas) => (this.mangas = mangas.mangas));
  }

  onSearchChange() {
    if (this.searchValue != '') {
      this.mangaService.getSearchedManga(this.searchValue).subscribe((value) => this.mangas = value.mangas)
    } else {
      this.mangaService
      .getAllMangas()
      .subscribe((mangas) => (this.mangas = mangas.mangas));
    }
  }
}
