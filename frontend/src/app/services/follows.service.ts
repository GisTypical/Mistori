import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MangasObject } from '../shared/Manga';
import { Message } from '../shared/Message';

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  getFollowEvent: Observable<unknown>;
  private followEvent = new Subject();
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.getFollowEvent = this.followEvent.asObservable();
  }

  sendFollowEvent() {
    this.followEvent.next();
  }

  getFollowedMangas(): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga/followed`);
  }

  postFollow(mangaId: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiURL}/manga/follow`, { mangaId });
  }

  deleteFollow(mangaId: string): Observable<Message> {
    return this.http.delete<Message>(`${this.apiURL}/manga/follow/${mangaId}`);
  }
}
