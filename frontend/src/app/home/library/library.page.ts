import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  mangas: Manga[];
  constructor(private mangaService: MangaService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.mangaService.getFollowedMangas().subscribe(({ mangas }) => {
      console.log(mangas);
      this.mangas = mangas;
    });
  }
}
