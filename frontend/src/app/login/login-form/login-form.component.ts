import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/User';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() newLoginEvent = new EventEmitter<User>();

  username: string;
  password: string;

  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.isSubmitted = !this.isSubmitted;
    // Estas validaciones son una shit lo sé
    if (!this.username || !this.password) {
      return;
    }
    const user = {
      username: this.username.toLowerCase(),
      password: this.password,
    };
    this.newLoginEvent.emit(user);
  }
}
