import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  AlertController,
  Gesture,
  GestureController,
  IonItem,
  GestureDetail,
} from '@ionic/angular';
import { ChapterService } from 'src/app/services/chapter.service';
import { Chapter } from 'src/app/shared/Chapter';

@Component({
  selector: 'app-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.scss'],
})
export class ChapterListComponent implements AfterViewInit {
  @ViewChildren(IonItem, { read: ElementRef })
  chapterItems: QueryList<ElementRef>;
  @Input() chapters: Chapter[];
  @Input() isUploader: boolean;

  isLongPressActive: boolean;

  constructor(
    private chapterService: ChapterService,
    private gestureController: GestureController,
    private alertController: AlertController
  ) {}

  ngAfterViewInit() {
    this.useLongPress(this.chapterItems.toArray());
  }

  // Set chapter id that manga viewer is going to use
  openView(chapterid: string) {
    this.chapterService.setChapter(chapterid);
  }

  // Delete alert
  async presentAlert(chapter: Chapter) {
    const alert = await this.alertController.create({
      header: 'Delete chapter',
      message: 'Are you sure you want to delete this chapter?',
      cssClass: 'delete-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'delete',
          cssClass: 'delete-button',
          handler: () => {
            this.chapterService.deleteChapter(chapter.id).subscribe();
          },
        },
      ],
    });

    await alert.present();
  }

  // Load on all items the long-press gesture
  useLongPress(chapterItems: ElementRef[]) {
    for (const [i, chapter] of chapterItems.entries()) {
      const gesture: Gesture = this.gestureController.create(
        {
          el: chapter.nativeElement,
          gestureName: 'long-press',
          threshold: 1,
          onStart: () => {
            this.isLongPressActive = true;
            this.onLongPress(i);
          },
          onEnd: () => {
            this.isLongPressActive = false;
          },
        },
        true
      );
      gesture.enable(true);
    }
  }

  private onLongPress(i: number) {
    const chapter = this.chapters[i];
    setTimeout(() => {
      if (this.isLongPressActive && this.isUploader) {
        this.presentAlert(chapter);
      }
    }, 400);
  }
}
