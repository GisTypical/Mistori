import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  mangas: Manga[];
  searchValue: string;

  isLoading = false;
  constructor(
    private mangaService: MangaService,
    private loadingService: LoadingService
  ) {
    this.loadingService.currentLoading.subscribe((b) => (this.isLoading = b));
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.mangaService
      .getAllMangas()
      .subscribe((mangas) => (this.mangas = mangas.mangas));
  }

  onSearchChange() {
    if (this.searchValue != '') {
      this.mangaService
        .getSearchedManga(this.searchValue)
        .subscribe((value) => (this.mangas = value.mangas));
    } else {
      this.mangaService
        .getAllMangas()
        .subscribe((mangas) => (this.mangas = mangas.mangas));
    }
  }
}
