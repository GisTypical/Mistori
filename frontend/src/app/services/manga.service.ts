import { Injectable } from '@angular/core';
import { Manga } from '../shared/Manga'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
}

interface Message {
  status: number,
  mangas: Manga[]
}

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private apiURL = environment.apiUrl

  constructor(private http: HttpClient) { }

  submitManga(formData: FormData): Observable<Message> {
    console.log(formData.get('name'))
    console.log(formData.get('author'))
    console.log(formData.get('description'))
    console.log(formData.get('date'))
    console.log(formData.get('cover'))
    console.log(formData.get('status'))

    return this.http.post<Message>(`${this.apiURL}/manga`, formData)
  }

  getUploadedMangas(): Observable<Message> {
    return this.http.get<Message>(`${this.apiURL}/manga`)
  }
}
