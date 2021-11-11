import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MangaService } from 'src/app/services/manga.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.page.html',
  styleUrls: ['./manga-create.page.scss'],
})
export class MangaCreatePage implements OnInit {

  constructor(private mangaService: MangaService,
    private router: Router,
    private toastController: ToastController) {
    }

  ngOnInit() {}

  submitManga(formData: FormData) {
    this.mangaService.submitManga(formData).subscribe((value) => {
      console.log(value);
      this.toastController.create({
        color: 'primary',
        duration: 2000,
        message: 'Manga created'
      }).then(toastEl => {
        toastEl.present()
      })
    });
  }
}
