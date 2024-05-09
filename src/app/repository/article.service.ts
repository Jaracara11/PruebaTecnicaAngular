import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = ' https://localhost:5001/api/articles/';

  constructor(private http: HttpClient) {}

  getArticleByCode(code: string): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${code}`);
  }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.apiUrl}`);
  }

  addNewArticle(articulo: Article): Observable<Article> {
    return this.http.post<Article>(`${this.apiUrl}`, articulo);
  }

  updateArticle(articulo: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/edit`, articulo);
  }

  deleteArticleByCode(code: string): Observable<Article> {
    return this.http.delete<Article>(`${this.apiUrl}/delete/${code}`);
  }
}
