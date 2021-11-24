import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { MangaService } from 'src/app/services/manga.service';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.page.html',
  styleUrls: ['./manga-create.page.scss'],
})
export class MangaCreatePage implements OnInit {
  isLoading: boolean;
  loading: HTMLIonLoadingElement;
  toast: HTMLIonToastElement;

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
    this.presentLoading();
    this.mangaService
      .submitManga(formData)
      .pipe(
        finalize(() => {
          this.loading.dismiss();
          this.mangaService.sendMangaAddEvent();
        })
      )
      .subscribe(() => {
        this.toastLoading(formData.get('name').toString());
      });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Uploading manga...',
    });
    return this.loading.present();
  }

  async toastLoading(name: string) {
    this.toast = await this.toastController.create({
      color: 'primary',
      duration: 2000,
      message: `"${name}" created succesfully!`,
    });
    return this.toast.present();
  }
}
