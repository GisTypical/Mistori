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

@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private apiURL = environment.apiUrl

  constructor(private http: HttpClient) { }

  submitManga(manga: Manga): Observable<Manga> {
    console.log('Manga Create')
    console.table([manga.name, manga.author, manga.date, manga.cover, manga.status, manga.description])

    const formData = new FormData()
    formData.append('name', manga.name)
    formData.append('author', manga.author)
    formData.append('description', manga.description)
    formData.append('date', manga.date)
    formData.append('cover', manga.cover)
    formData.append('status', manga.status)

    console.log(formData.get('name'))
    console.log(formData.get('author'))
    console.log(formData.get('description'))
    console.log(formData.get('date'))
    console.log(formData.get('cover'))
    console.log(formData.get('status'))

    return this.http.post<Manga>(`${this.apiURL}/manga`, manga)
  }
}
