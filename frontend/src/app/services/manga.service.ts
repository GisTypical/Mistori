import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Manga, MangasObject } from '../shared/Manga';
import { Message } from '../shared/Message';

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  currentMangaID: Observable<string>;
  getMangaEvent: Observable<unknown>;

  private mangaID = new BehaviorSubject('');
  private addMangaEvent = new Subject();
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentMangaID = this.mangaID.asObservable();
    this.getMangaEvent = this.addMangaEvent.asObservable();
  }

  setManga(mangaID: string) {
    this.mangaID.next(mangaID);
  }

  sendMangaAddEvent() {
    this.addMangaEvent.next();
  }

  submitManga(formData: FormData): Observable<Message> {
    return this.http.post<Message>(`${this.apiURL}/manga`, formData);
  }

  getUploadedMangas(): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga`);
  }

  getMangaInfo(mangaID: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.apiURL}/manga/${mangaID}`);
  }

  getAllMangas(): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga/all`);
  }

  getSearchedManga(name: string): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga/search/${name}`);
  }

  deleteManga(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.apiURL}/manga/${id}`);
  }
}
