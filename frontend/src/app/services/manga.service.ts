import { Injectable } from '@angular/core';
import { Manga } from '../shared/Manga'

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor() { }

  submitManga(manga: Manga) {
    console.log('Manga Create')
    console.table([manga.name, manga.author, manga.date, manga.status, manga.description])

    const formData = new FormData()
    formData.append('name', manga.name)
    formData.append('author', manga.author)
    formData.append('description', manga.description)
    formData.append('date', manga.date)
    formData.append('status', manga.status)

    console.log(formData.get('name'))
    console.log(formData.get('author'))
    console.log(formData.get('description'))
    console.log(formData.get('date'))
    console.log(formData.get('status'))
  }
}
