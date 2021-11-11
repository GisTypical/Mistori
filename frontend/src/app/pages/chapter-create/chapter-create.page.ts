import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/services/chapter.service';
import { MangaService } from 'src/app/services/manga.service';
import { Chapter } from 'src/app/shared/Chapter';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-chapter-create',
  templateUrl: './chapter-create.page.html',
  styleUrls: ['./chapter-create.page.scss'],
})
export class ChapterCreatePage implements OnInit {
  mangaID: string;

  constructor(
    private chapterService: ChapterService,
    private mangaService: MangaService,
    private toastController: ToastController
  ) {
    this.mangaService.currentMangaID.subscribe((id) => (this.mangaID = id));
  }

  ngOnInit() {}

  submitChapter(formData: FormData) {
    formData.append('mangaId', this.mangaID);
    this.chapterService.createChapter(formData).subscribe((value) => {
      this.toastController.create({
        color: 'primary',
        duration: 2000,
        message: 'Chapter created'
      }).then(toastEl => {
        toastEl.present()
      })
    });
  }
}
