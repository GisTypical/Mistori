import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../shared/Message';
import { User } from '../shared/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogged: Observable<string>;
  private initialLogged = new BehaviorSubject('unknown');
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.isLogged = this.initialLogged.asObservable();
  }

  userLogin(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/api/login`, user);
  }

  userSignup(user: User): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/api/signup`, user);
  }

  refreshToken(): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}/api/refresh-token`, {});
  }

  setLogged(s: string) {
    this.initialLogged.next(s);
  }
}
