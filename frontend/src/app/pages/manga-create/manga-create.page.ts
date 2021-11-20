import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.page.html',
  styleUrls: ['./manga-create.page.scss'],
})
export class MangaCreatePage implements OnInit {
  isLoading: boolean;

  constructor(
    private mangaService: MangaService,
    private toastController: ToastController,
    private loadingService: LoadingService
  ) {
    this.loadingService.currentLoading.subscribe((b) => {
      this.isLoading = b;
    });
  }

  ngOnInit() {}

  submitManga(formData: FormData) {
    this.mangaService.submitManga(formData).subscribe(() => {
      this.toastController
        .create({
          color: 'primary',
          duration: 2000,
          message: `"${formData.get('name')}" created succesfully`,
        })
        .then((toastEl) => {
          toastEl.present();
        });
    });
  }
}
