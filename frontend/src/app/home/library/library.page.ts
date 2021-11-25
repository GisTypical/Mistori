import { Component, OnInit } from '@angular/core';
import { FollowsService } from 'src/app/services/follows.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Manga } from 'src/app/shared/Manga';
import { parseDate } from 'src/app/utils/parseDate';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit {
  mangas: Manga[];
  isLoading: boolean;
  constructor(
    private followsService: FollowsService,
    private loadingService: LoadingService
  ) {
    this.followsService.getFollowEvent.subscribe(() => {
      this.refreshFollowingMangas();
    });
    this.loadingService.currentLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.refreshFollowingMangas();
  }

  private refreshFollowingMangas() {
    this.followsService.getFollowedMangas().subscribe(({ mangas }) => {
      this.mangas = mangas;

      parseDate(this.mangas);
    });
  }
}
