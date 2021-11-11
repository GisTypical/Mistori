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

  constructor() {}

  ngOnInit() {}

  onSubmit() {
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
