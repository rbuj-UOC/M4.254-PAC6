import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article';
import { ArticleQuantityChange } from '../../model/article-quantity-change';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleService } from '../../serveis/article.service';
import { Subject } from 'rxjs';
import {
  startWith,
  merge,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-article-list',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  template: `
    <div class="search-box">
      <input
        type="text"
        placeholder="Cercar articles"
        name="searchBox"
        [(ngModel)]="searchTerm"
        (keyup)="search()"
      />
    </div>
    <div class="article-list">
      <app-article-item
        [article]="article"
        (quantityChange)="onQuantityChange($event)"
        *ngFor="let article of articles$ | async"
      ></app-article-item>
    </div>
  `,
  styles: `
    .article-list {
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
    }
    .search-box {
      padding: 10px;
    }
  `
})
export class ArticleListComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public searchTerm = '';

  private searchSubject = new Subject<string>();
  private reloadArticleList = new Subject<void>();

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles$ = this.searchSubject.pipe(
      startWith(this.searchTerm),
      debounceTime(300),
      distinctUntilChanged(),
      merge(this.reloadArticleList),
      switchMap((query) => this.articleService.getArticles(this.searchTerm))
    );
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService
      .changeQuantity(change.article.id, change.changeInQuantity)
      .subscribe((res) => this.reloadArticleList.next());
  }

  onCreate() {
    this.reloadArticleList.next();
  }
}
