import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPages(chapterId): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chapter/${chapterId}`);
  }
}