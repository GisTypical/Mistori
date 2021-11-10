import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  isLogged: string;
  isLoading: boolean;

  constructor(private authService: AuthService) {
    this.authService.isLogged.subscribe((s) => (this.isLogged = s));
  }

  ngOnInit() {}
}
