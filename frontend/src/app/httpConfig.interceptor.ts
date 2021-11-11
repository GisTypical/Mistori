import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.loading();
    const token: string = localStorage.getItem('accessToken');
    const refreshToken: string = localStorage.getItem('refreshToken');

    const isRouteRefresh: boolean = request.url.includes('refresh-token');

    // If it is refresh route, set refresh token in authZ
    if (refreshToken && isRouteRefresh) {
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    }

    // If it is another route, set access token
    if (token && !isRouteRefresh) {
      request = request.clone({
        setHeaders: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     setHeaders: {
    //       'content-type': 'application/json',
    //     },
    //   });
    // }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.done();
      })
    );
  }
}
