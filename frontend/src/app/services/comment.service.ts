import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../shared/Comment'

interface CommentObject {
  comments?: Comment[],
  message?: string
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

  getComments(chapterID: string): Observable<CommentObject> {
    return this.http.get<CommentObject>(`${this.apiUrl}/comment/${chapterID}`)
  }

  updateComment(comment: Comment, commentID: string): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comment/${commentID}`, comment)
  }

  deleteComment(commentID: string): Observable<Comment> {
    return this.http.delete<Comment>(`${this.apiUrl}/comment/${commentID}`)
  }
}
