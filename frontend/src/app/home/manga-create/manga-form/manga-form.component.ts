import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-manga-form',
  templateUrl: './manga-form.component.html',
  styleUrls: ['./manga-form.component.scss'],
})
export class MangaFormComponent implements OnInit {
  @Output() onSubmitManga: EventEmitter<Manga> = new EventEmitter()
  name: string
  author: string
  description: string
  date: string
  status: string
  cover: string

  constructor() { }

  ngOnInit() {}

  onSubmit() {
    const newManga: Manga = {
      name: this.name,
      author: this.author,
      description: this.description,
      date: this.date,
      cover: this.cover,
      status: this.status
    }
    this.onSubmitManga.emit(newManga)
  }

}
