import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoading: boolean;

  constructor(private authService: AuthService) {}

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
  }
}
