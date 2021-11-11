import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { MangaService } from '../../services/manga.service';

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

  isLoading: boolean;

  constructor(
    private mangaService: MangaService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.loadingService.currentLoading.subscribe((b) => (this.isLoading = b));
  }

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
