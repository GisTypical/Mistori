import { Component, Input, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() mangaID: string;
  @Input() isFollower: boolean;

  constructor(private mangaService: MangaService) {}

  ngOnInit() {}

  onFollowChapter() {
    this.mangaService.postFollow(this.mangaID).subscribe();
  }

  onUnfollowChapter() {
    this.mangaService.postFollow(this.mangaID).subscribe();
  }
}
