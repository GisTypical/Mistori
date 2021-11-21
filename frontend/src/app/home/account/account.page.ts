import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MangaService } from '../../services/manga.service';
import { Manga } from '../../shared/Manga';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLogged: string;
  isLoading: boolean;
  mangas: Manga[] = [];

  constructor(
    private authService: AuthService,
    private mangaService: MangaService
  ) {
    this.authService.isLogged.subscribe((s) => (this.isLogged = s));
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.mangaService
      .getUploadedMangas()
      .subscribe((mangas) => {
        this.mangas = mangas.mangas

        for (let i = 0; i < this.mangas.length; i++) {
          const mangaYear = new Date(this.mangas[i].date).getFullYear()
          const mangaMonth = new Date(this.mangas[i].date).getMonth()
          const mangaDay = new Date(this.mangas[i].date).getDate()
          this.mangas[i].date = `${mangaMonth}/${mangaDay}/${mangaYear}`
        }
      });
  }

  logout() {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    this.authService.setLogged('notLogged');
  }
}
