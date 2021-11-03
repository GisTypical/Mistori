import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  username: string;
  password: string;

  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.username, this.password);
  }
}
