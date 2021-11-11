import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChapterService {
  currentChapterId: Observable<string>;
  private chaptedId = new BehaviorSubject('');
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentChapterId = this.chaptedId.asObservable();
  }

  createChapter(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chapter`, formData);
  }

  getPages(chapterId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/chapter/${chapterId}`);
  }

  deleteChapter(chapterId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/chapter`, {
      body: { chapterId },
    });
  }

  setChapter(chapter: string) {
    this.chaptedId.next(chapter);
  }
}
