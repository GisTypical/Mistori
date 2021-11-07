import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLogged: boolean;

  constructor(private userService: UserService) {
    this.userService.isLogged.subscribe((b) => (this.isLogged = b));
  }

  ngOnInit() {}
}
