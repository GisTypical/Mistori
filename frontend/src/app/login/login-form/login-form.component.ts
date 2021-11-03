import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  username: string;
  password: string;

  isSubmitted = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    // Estas validaciones son una shit lo sé
    if (!this.username || !this.password) {
      return;
    }
    const user = {
      username: this.username.toLowerCase(),
      password: this.password,
    };
    this.isSubmitted = !this.isSubmitted;
    this.loginService.userLogin(user).subscribe(
      (data) => {
        this.isSubmitted = !this.isSubmitted;
        this.router.navigate(['/home']);
      },
      (err) => {
        console.error(err);
        this.isSubmitted = !this.isSubmitted;
      }
    );
  }
}
