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

  isLoading = false;
  constructor(
    private mangaService: MangaService,
    private loadingService: LoadingService
  ) {
    this.loadingService.currentLoading.subscribe((b) => (this.isLoading = b));
    this.mangaService
      .getAllMangas()
      .subscribe((mangas) => (this.mangas = mangas.mangas));
  }

  ngOnInit() {}
}
