import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private http = inject(HttpClient);

  getArticles(query: string): Observable<Article[]> {
    return this.http.get<Article[]>('/api/articles', {
      params: { q: query }
    });
  }

  changeQuantity(id: number, changeInQuantity: number): Observable<any> {
    return this.http.patch('/api/articles/' + id, {
      changeInQuantity: changeInQuantity
    });
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('/api/articles', article);
  }
}
