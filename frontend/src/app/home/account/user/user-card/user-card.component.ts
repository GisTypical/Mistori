import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
