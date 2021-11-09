import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLogged: Observable<boolean>;
  private initialLogged = new BehaviorSubject(false);

  constructor() {
    this.isLogged = this.initialLogged.asObservable();
  }

  setLogged(b: boolean) {
    this.initialLogged.next(b);
  }
}
