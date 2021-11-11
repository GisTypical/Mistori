import { Component, Input, OnInit } from '@angular/core';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.scss'],
})
export class MangaItemComponent implements OnInit {
  @Input() mangaItem: Manga;

  constructor() {}

  ngOnInit() {}
}
