import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { FcmService } from 'src/app/services/fcm.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../shared/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isError = false;

  private loading: HTMLIonLoadingElement;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private fcmService: FcmService
  ) {}

  ngOnInit() {}

  loginUser(user: User) {
    this.isError = false;
    this.presentLoading();

    this.fcmService.currentFcmToken.subscribe((token: string) => {
      user.fcmToken = token;
    });

    this.authService
      .userLogin(user)
      .pipe(
        finalize(() => {
          this.loading.dismiss();
        })
      )
      .subscribe(
        (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          this.authService.setLogged('logged');
          this.router.navigate(['/home']);
        },
        () => {
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
