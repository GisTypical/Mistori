import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/shared/Manga';

@Component({
  selector: 'app-get-mangas',
  templateUrl: './get-mangas.component.html',
  styleUrls: ['./get-mangas.component.scss'],
})
export class GetMangasComponent implements OnInit {
  mangas: Manga[] = []

  constructor(private mangaService: MangaService) { }

  ngOnInit() {
    this.mangaService.getUploadedMangas().subscribe((mangas) => this.mangas = mangas.mangas)
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter')
  }

  ionViewDidEnter(): void {
    this.mangaService.getUploadedMangas().subscribe((mangas) => this.mangas = mangas.mangas)
    console.log('ionViewDidEnter')
  }

}
