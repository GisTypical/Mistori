import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ChapterService } from 'src/app/services/chapter.service';
import { StorageService } from 'src/app/services/storage.service';
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
  rtl = false;
  chapterID: string;

  private slide: number;
  constructor(
    private chapterService: ChapterService,
    private actionSheetController: ActionSheetController,
    private storage: StorageService
  ) {
    this.chapterService.currentChapterId.subscribe(
      (id) => (this.chapterID = id)
    );
    this.chapterService
      .getPages(this.chapterID)
      .subscribe((data) => (this.pages = data.resources));

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
        this.swiper.swiperRef.slideTo(Number(lastSlide), 0, false);
      });
    }
  }

  onExit() {
    const activeSlide = this.swiper.swiperRef.activeIndex;
    this.storage.setItem(this.chapterID, activeSlide.toString());
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
