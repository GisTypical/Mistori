import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../signup.service';

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

  constructor(private signupService: SignupService, private router: Router) {}

  ngOnInit() {}

  onSubmit(): void {
    // Estas validaciones son una shit lo sé
    if (!this.username || !this.fullName || !this.password) {
    }
    const user = {
      username: this.username.toLowerCase(),
      fullName: this.fullName.toLowerCase(),
      password: this.password,
    };
    this.signupService.userSignup(user).subscribe(
      (resp) => {
        // Pensando en si llevarlo de una a Home
        this.router.navigate(['/login']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
