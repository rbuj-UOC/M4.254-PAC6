import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(query: string): Observable<Article[]> {
    return this.http.get<Article[]>('/api/articles', {
      params: {q: query}
    });
  }

  changeQuantity(id: number, changeInQuantity: number): Observable<any> {
    return this.http.patch('/api/articles/' + id, {changeInQuantity: changeInQuantity});
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('/api/articles', article);
  }
}
