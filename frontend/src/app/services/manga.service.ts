import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { Manga } from '../shared/Manga';
import { Message } from '../shared/Message';

interface MangasObject {
  mangas: Manga[];
}

@Injectable({
  providedIn: 'root',
})
export class MangaService {
  currentMangaID: Observable<string>;
  private mangaID = new BehaviorSubject('');
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentMangaID = this.mangaID.asObservable();
  }

  setManga(mangaID: string) {
    this.mangaID.next(mangaID);
  }

  submitManga(formData: FormData): Observable<Message> {
    return this.http.post<Message>(`${this.apiURL}/manga`, formData);
  }

  getUploadedMangas(): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga`);
  }

  getManga(mangaID: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.apiURL}/manga/${mangaID}`);
  }

  getAllMangas(): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga/all`);
  }

  getSearchedManga(name: string): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga/search/${name}`);
  }

  getFollowedMangas(): Observable<MangasObject> {
    return this.http.get<MangasObject>(`${this.apiURL}/manga/followed`);
  }

  postFollow(mangaId: string): Observable<Message> {
    return this.http.post<Message>(`${this.apiURL}/manga/follow`, { mangaId });
  }
}
