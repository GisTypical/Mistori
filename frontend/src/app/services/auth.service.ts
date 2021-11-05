import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../_shared/User';

interface Message {
  message?: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://mistori.herokuapp.com';

  constructor(private http: HttpClient) {}

  userLogin(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.url}/api/login`, user);
  }

  userSignup(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.url}/api/signup`, user);
  }

  isLogged(): Observable<Message> {
    return this.http.get<Message>(`${this.url}/api/loggedin`);
  }
}
