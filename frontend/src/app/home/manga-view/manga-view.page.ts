import {
  AfterContentChecked,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { ChapterService } from 'src/app/services/chapter.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.page.html',
  styleUrls: ['./manga-view.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MangaViewPage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  config: SwiperOptions = {
    direction: 'horizontal',
    lazy: true,
  };

  pages: any;
  rtl = false;
  private chapterID = '9e9eae8e-5e2a-4284-be60-3e2b282a13b4';

  constructor(
    private chapterService: ChapterService,
    private actionSheetController: ActionSheetController
  ) {
    this.chapterService
      .getPages(this.chapterID)
      .subscribe((data) => (this.pages = data.resources));
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Page options',
      buttons: [
        {
          text: `Left to right swipe`,
          icon: 'arrow-forward-circle-outline',
          handler: () => {
            this.swiper.swiperRef.changeDirection('horizontal');
            // Set rtl attribute to false
            this.rtl = false;
            // The swiper needs to know where to slide
            this.swiper.swiperRef.rtlTranslate = false;
          },
        },
        {
          text: `Right-to-left swipe`,
          icon: 'arrow-back-circle-outline',
          handler: () => {
            this.swiper.swiperRef.changeDirection('horizontal');
            // Set rtl attribute to true
            this.rtl = true;
            // The swiper needs to know where to slide
            this.swiper.swiperRef.rtlTranslate = true;
          },
        },
        {
          text: `Toggle top-bottom swipe`,
          icon: 'arrow-down-circle-outline',
          handler: () => {
            // Disable rtl in vertical
            this.swiper.swiperRef.rtlTranslate = false;
            this.swiper.swiperRef.changeDirection('vertical');
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
}
