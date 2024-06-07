import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../model/article';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles: Article[];
  constructor() {
    this.articles = [
      {
        id: 1,
        name: 'Aerosmith: Permanent Vacation',
        imageUrl: 'assets/records/permanent-vacation.webp',
        price: 31.99,
        isOnSale: true,
        quantityInCart: 0
      },
      {
        id: 2,
        name: 'The Beatles: Sgt. Pepper`s Lonely Hearts Club Band',
        imageUrl: 'assets/records/beatles.webp',
        price: 36.99,
        isOnSale: false,
        quantityInCart: 0
      },
      {
        id: 3,
        name: 'Pulp Fiction',
        imageUrl: 'assets/records/pulp-fiction.webp',
        price: 25.99,
        isOnSale: true,
        quantityInCart: 0
      }
    ];
  }

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  changeQuantity(id: number, changeInQuantity: number): Observable<Article> {
    const article = this.articles
      .find(art => art.id === id);
    article.quantityInCart += changeInQuantity;
    return of(article);
  }

  createArticle(article: Article): Observable<any> {
    let articleClone = Object.assign({}, article);;
    articleClone.id = this.articles.length + 1;
    articleClone.quantityInCart = 0;
    this.articles.push(articleClone);
    return of(articleClone);
  }
}
