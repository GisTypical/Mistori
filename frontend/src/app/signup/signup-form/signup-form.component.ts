import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  username: string;
  fullName: string;
  password: string;

  isSubmitted: false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(): void {
    if (!this.username || !this.fullName || !this.password) {
    }
    const user = {
      username: this.username.toLowerCase(),
      fullName: this.fullName.toLowerCase(),
      password: this.password,
    };
    this.authService.userSignup(user).subscribe(
      (resp) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
