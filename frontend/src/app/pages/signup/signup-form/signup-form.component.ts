import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  username: string;
  fullName: string;
  password: string;

  isError = false;
  loading: HTMLIonLoadingElement;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    this.presentLoading();
    this.isError = false;
    if (!this.username || !this.fullName || !this.password) {
      return;
    }

    const user = {
      username: this.username.toLowerCase(),
      fullName: this.fullName.toLowerCase(),
      password: this.password,
    };

    this.authService
      .userSignup(user)
      .pipe(
        finalize(() => {
          this.loading.dismiss();
        })
      )
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error(err);
          this.isError = true;
        }
      );
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    return this.loading.present();
  }
}
