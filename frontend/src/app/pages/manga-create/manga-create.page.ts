import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { MangaService } from 'src/app/services/manga.service';
import { finalize } from 'rxjs/operators'
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.page.html',
  styleUrls: ['./manga-create.page.scss'],
})
export class MangaCreatePage implements OnInit {
  isLoading: boolean;
  loading: HTMLIonLoadingElement;

  constructor(
    private mangaService: MangaService,
    private toastController: ToastController,
    private loadingService: LoadingService,
    private loadingController: LoadingController
  ) {
    this.loadingService.currentLoading.subscribe((b) => {
      this.isLoading = b;
    });
  }

  ngOnInit() {}

  submitManga(formData: FormData) {
    // this.mangaService.submitManga(formData).subscribe(() => {
    //   this.toastController
    //     .create({
    //       color: 'primary',
    //       duration: 2000,
    //       message: `"${formData.get('name')}" created succesfully`,
    //     })
    //     .then((toastEl) => {
    //       toastEl.present();
    //     });
    // });
    this.presentLoading();
    this.mangaService.submitManga(formData)
    .pipe(finalize(() => this.loading.dismiss()))
    .subscribe(() => {
      this.toastController
        .create({
          color: 'primary',
          duration: 2000,
          message: `"${formData.get('name')}" created succesfully`,
        })
        .then((toastEl) => {
          toastEl.present();
        });
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Creating manga...',
    });
    return this.loading.present();
  }
}
