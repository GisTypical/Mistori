import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private fcmService: FcmService
  ) {}

  ngOnInit() {
    this.authService.refreshToken().subscribe(
      (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        this.authService.setLogged('logged');
      },
      () => {
        this.authService.setLogged('notLogged');
      }
    );
    this.fcmService.initFCM();
  }
}
