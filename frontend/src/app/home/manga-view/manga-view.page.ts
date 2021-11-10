import {
  AfterContentChecked,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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
  private chapterID = '0f836aca-01cb-41be-a58e-866cc479d661';

  constructor(private chapterService: ChapterService) {
    this.chapterService
      .getPages(this.chapterID)
      .subscribe((data) => (this.pages = data.resources));
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  changeHorizontal() {
    this.rtl = !this.rtl;
    this.swiper.swiperRef.rtlTranslate = !this.swiper.swiperRef.rtlTranslate;
  }
}
