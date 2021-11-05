import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../_shared/User';

interface Message {
  message?: string;
  accessToken: string;
  refreshToken: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  userLogin(user: User): Observable<Message> {
    console.log(httpOptions);
    return this.http.post<Message>(`${this.url}/api/login`, user, httpOptions);
  }

  userSignup(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.url}/api/signup`, user, httpOptions);
  }

  isLogged(): Observable<Message> {
    return this.http.get<Message>(`${this.url}/api/loggedin`, httpOptions);
  }
}
