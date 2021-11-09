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
  }
}
