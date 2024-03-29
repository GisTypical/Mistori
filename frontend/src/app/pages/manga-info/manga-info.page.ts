import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { LoadingService } from 'src/app/services/loading.service';
import { Manga } from 'src/app/shared/Manga';
import { ChapterService } from '../../services/chapter.service';
import { MangaService } from '../../services/manga.service';

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
    chapters: [],
    date: '',
    status: '',
    uploadedBy: '',
    isFollower: false,
  };

  username: string;
  isLoading: boolean;

  constructor(
    private mangaService: MangaService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private chapterService: ChapterService,
    private router: Router
  ) {
    this.loadingService.currentLoading.subscribe((b) => (this.isLoading = b));
    const token = localStorage.getItem('accessToken');
    // Check if user is the uploader by decoding jwt accessToken
    if (token) {
      const payload: { sub: string } = jwtDecode(
        localStorage.getItem('accessToken')
      );
      this.username = payload.sub;
    } else {
      this.username = '';
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('mangaID')) {
        return;
      }

      const mangaID = paramMap.get('mangaID');
      this.manga.id = mangaID;
    });
  }

  ionViewDidEnter() {
    this.mangaService.getMangaInfo(this.manga.id).subscribe((manga) => {
      this.manga = manga;

      for (const chapters of this.manga.chapters) {
        const chapterYear = new Date(chapters.date).getFullYear();
        const chapterMonth = new Date(chapters.date).getMonth();
        const chapterDay = new Date(chapters.date).getDate();

        chapters.date = `${chapterMonth}/${chapterDay}/${chapterYear}`;
      }
    });
  }

  chapterDelete(chapterId: string) {
    this.chapterService.deleteChapter(chapterId).subscribe(() => {
      this.manga.chapters = this.manga.chapters.filter(
        (c) => c.id !== chapterId
      );
      console.log(this.manga.chapters, chapterId);
    });
  }

  mangaDelete() {
    this.mangaService.deleteManga(this.manga.id).subscribe(() => {
      this.mangaService.sendMangaAddEvent();
      this.router.navigate(['/home/account']);
    });
  }

  isUploader(): boolean {
    return this.username === this.manga.uploadedBy;
  }

  onFollowButton() {
    this.manga.isFollower = !this.manga.isFollower;
  }
}
