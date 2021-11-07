import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.refreshToken().subscribe(
      (data) => {
        localStorage.setItem('accessToken', data.accessToken);
        this.userService.setLogged(true);
      },
      () => {}
    );
  }
}
