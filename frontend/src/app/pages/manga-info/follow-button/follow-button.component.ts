import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FollowsService } from 'src/app/services/follows.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss'],
})
export class FollowButtonComponent implements OnInit {
  @Input() mangaID: string;
  @Input() isFollower: boolean;
  @Output() newFollowButton: EventEmitter<boolean> = new EventEmitter();

  constructor(private followsService: FollowsService) {}

  ngOnInit() {}

  onFollowButton() {
    if (!this.isFollower) {
      this.followsService.postFollow(this.mangaID).subscribe(() => {
        this.followsService.sendFollowEvent();
      });
    } else {
      this.followsService.deleteFollow(this.mangaID).subscribe(() => {
        this.followsService.sendFollowEvent();
      });
    }
    this.newFollowButton.emit();
  }
}
