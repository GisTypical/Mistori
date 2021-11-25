import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { ActionSheetController } from '@ionic/angular';
import { ChapterService } from 'src/app/services/chapter.service';
import { MangaService } from 'src/app/services/manga.service';
import { StorageService } from 'src/app/services/storage.service';
import { Chapter } from 'src/app/shared/Chapter';
import { Manga } from 'src/app/shared/Manga';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

interface Page {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  secure_url: string;
}

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.page.html',
  styleUrls: ['./manga-view.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MangaViewPage {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    direction: 'horizontal',
    lazy: true,
  };

  pages: Page[];
  manga: Manga;
  chapter: Chapter;

  rtl = false;
  chapterID: string;
  lastSlide: number;

  constructor(
    private chapterService: ChapterService,
    private mangaService: MangaService,
    private actionSheetController: ActionSheetController,
    private storage: StorageService
  ) {
    this.chapterService.currentChapterId.subscribe(
      (id) => (this.chapterID = id)
    );
    this.chapterService.getPages(this.chapterID).subscribe((data) => {
      this.pages = data.resources;
      this.mangaService.getMangaInfo(data.mangaId).subscribe((manga) => {
        this.manga = manga;
        this.chapter = manga.chapters.find(
          (chapter) => chapter.id === this.chapterID
        );
      });
    });

    this.storage.getItem('readMode').then((readMode: string) => {
      if (!readMode || readMode === 'leftToRight') {
        this.readLeftToRight();
        return;
      }
      if (readMode === 'rightToLeft') {
        this.readRightToLeft();
        return;
      }
      if (readMode === 'vertical') {
        this.readVertical();
        return;
      }
    });
  }

  ionViewDidEnter() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
      this.storage.getItem(this.chapterID).then((lastSlide: string) => {
        this.lastSlide = Number(lastSlide);
        this.swiper.swiperRef.slideTo(Number(lastSlide), 0, false);
      });
    }
  }

  onExit() {
    const activeSlide = this.swiper.swiperRef.activeIndex;
    this.storage.setItem(this.chapterID, activeSlide.toString());
  }

  async share() {
    console.log(this.manga.name, this.chapter.title);
    if (Capacitor.getPlatform() !== 'web') {
      await Share.share({
        title: 'See my progress on Mistori!',
        text: `See my progress on Mistori!\n\nI\'m on page ${this.lastSlide} of ${this.manga.name} / ${this.chapter.title}`,
        dialogTitle: 'Share with your friends',
      });
    }
  }

  // Show action sheet for reading modes
  async showReadingModes() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Page options',
      buttons: [
        {
          text: `Left to right swipe`,
          icon: 'arrow-forward-circle-outline',
          handler: () => {
            this.readLeftToRight();
          },
        },
        {
          text: `Right-to-left swipe`,
          icon: 'arrow-back-circle-outline',
          handler: () => {
            this.readRightToLeft();
          },
        },
        {
          text: `Toggle top-bottom swipe`,
          icon: 'arrow-down-circle-outline',
          handler: () => {
            // Disable rtl in vertical
            this.readVertical();
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  private readLeftToRight() {
    this.swiper.swiperRef.changeDirection('horizontal');
    // Set rtl attribute to false
    this.rtl = false;
    // The swiper needs to know where to slide
    this.swiper.swiperRef.rtlTranslate = false;
    this.storage.setItem('readMode', 'leftToRight');
  }

  private readRightToLeft() {
    this.swiper.swiperRef.changeDirection('horizontal');
    // Set rtl attribute to true
    this.rtl = true;
    // The swiper needs to know where to slide
    this.swiper.swiperRef.rtlTranslate = true;
    this.storage.setItem('readMode', 'rightToLeft');
  }

  private readVertical() {
    this.swiper.swiperRef.rtlTranslate = false;
    this.swiper.swiperRef.changeDirection('vertical');
    this.storage.setItem(this.chapterID, 'vertical');
  }
}
