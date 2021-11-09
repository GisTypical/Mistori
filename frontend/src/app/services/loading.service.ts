import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  currentLoading: Observable<boolean>;
  private initialLoading = new BehaviorSubject<boolean>(false);

  constructor() {
    this.currentLoading = this.initialLoading.asObservable();
  }

  loading() {
    this.initialLoading.next(true);
  }

  done() {
    this.initialLoading.next(false);
  }
}
