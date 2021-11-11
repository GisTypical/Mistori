import { Component, OnInit } from '@angular/core';
import { MangaService } from '../../services/manga.service'
import { Manga } from '../../shared/Manga'
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-manga-info',
  templateUrl: './manga-info.page.html',
  styleUrls: ['./manga-info.page.scss'],
})
export class MangaInfoPage implements OnInit {
  mangaID: string
  cover: string
  name: string
  author: string
  status: string

  constructor(private mangaService: MangaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('mangaID')) {
        return
      }

      const mangaID = paramMap.get('mangaID')
      this.mangaID = mangaID
    })
  }

  ionViewDidEnter() {
    this.mangaService.getMangaID(this.mangaID).subscribe((manga) => {
      console.log(manga)
      this.cover = manga.cover
      this.name = manga.name
      this.author = manga.author
      this.status = manga.status.toUpperCase()

    })
  }

}
