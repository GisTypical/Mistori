import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-manga-create',
  templateUrl: './manga-create.page.html',
  styleUrls: ['./manga-create.page.scss'],
})
export class MangaCreatePage implements OnInit {
  constructor(private mangaService: MangaService, private router: Router) {}

  ngOnInit() {}

  submitManga(formData: FormData) {
    this.mangaService.submitManga(formData).subscribe((value) => {
      console.log(value);
      this.router.navigate(['/home/account']);
    });
  }
}
