import { Injectable } from '@angular/core';
import { Manga } from '../shared/Manga';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'multipart/form-data',
  }),
};

interface Message {
  status: number;
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

  submitManga(formData: FormData): Observable<Message> {
    console.log(formData.get('name'));
    console.log(formData.get('author'));
    console.log(formData.get('description'));
    console.log(formData.get('date'));
    console.log(formData.get('cover'));
    console.log(formData.get('status'));

    return this.http.post<Message>(`${this.apiURL}/manga`, formData);
  }

  getUploadedMangas(): Observable<Message> {
    return this.http.get<Message>(`${this.apiURL}/manga`);
  }

  getMangaID(mangaID: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.apiURL}/manga/${mangaID}`);
  }

  getAllMangas(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/manga/all`);
  }

  setManga(manga: string) {
    this.mangaID.next(manga);
  }
}
