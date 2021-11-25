import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { parseDate } from 'src/app/utils/parseDate';
import { MangaService } from '../../services/manga.service';
import { Manga } from '../../shared/Manga';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLogged: string;
  mangas: Manga[] = [];

  constructor(
    private authService: AuthService,
    private mangaService: MangaService
  ) {
    this.authService.isLogged.subscribe((s) => {
      this.isLogged = s
    });
    this.mangaService.getMangaEvent.subscribe(() => {
      this.refreshUserMangas();
    });
  }

  ngOnInit() {
    this.refreshUserMangas();
  }

  logout() {
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    this.authService.setLogged('notLogged');
  }

  private refreshUserMangas() {
    this.mangaService.getUploadedMangas().subscribe((mangas) => {
      this.mangas = mangas.mangas;

      parseDate(this.mangas);
    });
  }
}
