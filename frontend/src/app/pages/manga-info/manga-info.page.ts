import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { Manga } from 'src/app/shared/Manga';
import { MangaService } from '../../services/manga.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-manga-info',
  templateUrl: './manga-info.page.html',
  styleUrls: ['./manga-info.page.scss'],
})
export class MangaInfoPage implements OnInit {
  manga: Manga = {
    id: '',
    name: '',
    cover: '',
    author: '',
    uploadedBy: '',
    chapters: [],
    date: '',
    status: '',
  };

  isLoading = true;
  username: string;

  constructor(
    private mangaService: MangaService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.loadingService.currentLoading.subscribe((b) => (this.isLoading = b));
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload: { sub: string } = jwt_decode(
        localStorage.getItem('accessToken')
      );
      this.username = payload.sub;
    }
    this.username = '';
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('mangaID')) {
        return;
      }

      const mangaID = paramMap.get('mangaID');
      this.manga.id = mangaID;
    });
  }

  ionViewDidEnter() {
    this.mangaService.getManga(this.manga.id).subscribe((manga) => {
      this.manga = manga;
    });
  }
}
