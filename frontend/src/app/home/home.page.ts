import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log(localStorage.getItem('accessToken'));
    this.authService.isLogged().subscribe(
      () => {},
      (err) => {
        console.error(err);
        this.router.navigate(['/login']);
      }
    );
  }
}
