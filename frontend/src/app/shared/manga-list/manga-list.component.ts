import { Component, Input, OnInit } from '@angular/core';
import { Manga } from '../Manga';

@Component({
  selector: 'app-manga-list',
  templateUrl: './manga-list.component.html',
  styleUrls: ['./manga-list.component.scss'],
})
export class MangaListComponent implements OnInit {
  @Input() mangas: Manga[];

  constructor() {}

  ngOnInit() {}
}
