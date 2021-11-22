import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../shared/Comment'

interface CommentObject {
  comments: Comment[]
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  submitComment(comment: Comment, chapterID: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comment/${chapterID}`, comment)
  }
}
