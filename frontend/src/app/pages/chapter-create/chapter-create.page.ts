import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ChapterService } from 'src/app/services/chapter.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MangaService } from 'src/app/services/manga.service';
import { LoadingController } from '@ionic/angular'
import { finalize } from 'rxjs/operators'

@Component({
  selector: 'app-chapter-create',
  templateUrl: './chapter-create.page.html',
  styleUrls: ['./chapter-create.page.scss'],
})
export class ChapterCreatePage implements OnInit {
  isLoading = true;
  mangaID: string;
  loading: HTMLIonLoadingElement;

  constructor(
    private chapterService: ChapterService,
    private mangaService: MangaService,
    private toastController: ToastController,
    private loadingService: LoadingService,
    private loadingController: LoadingController
  ) {
    this.mangaService.currentMangaID.subscribe((id) => (this.mangaID = id));
    this.loadingService.currentLoading.subscribe((b) => {
      this.isLoading = b;
    });
  }

  ngOnInit() {}

  submitChapter(formData: FormData) {
    formData.append('mangaId', this.mangaID);
    this.presentLoading()
    // this.chapterService.createChapter(formData).subscribe(() => {
    //   this.toastController
    //     .create({
    //       color: 'primary',
    //       duration: 2000,
    //       message: `"${formData.get('title')}" created succesfully!`,
    //     })
    //     .then((toastEl) => {
    //       toastEl.present();
    //     });
    // });
    this.chapterService.createChapter(formData)
    .pipe(finalize(() => this.loading.dismiss()))
    .subscribe(() => {
      this.toastController
        .create({
          color: 'primary',
          duration: 2000,
          message: `"${formData.get('title')}" created succesfully!`,
        })
        .then((toastEl) => {
          toastEl.present();
        });
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Uploading chapter...',
    });
    return this.loading.present();
  }
}
