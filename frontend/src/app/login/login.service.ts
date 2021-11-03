import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { User } from '../_shared/User';

const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  userLogin(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/api/login`, user, httpOptions);
  }
}
