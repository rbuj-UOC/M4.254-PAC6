import { Component, OnInit, inject } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  merge,
  startWith,
  switchMap
} from 'rxjs';
import { Article } from '../../model/article';
import { ArticleQuantityChange } from '../../model/article-quantity-change';
import { ArticleService } from '../../services/article-service';

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
      @for (article of articles$ | async; track article.id) {
        <app-article-item
          [article]="article"
          (quantityChange)="onQuantityChange($event)"
        ></app-article-item>
      }
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
export class ArticleList implements OnInit {
  private articleService = inject(ArticleService);

  public articles$: Observable<Article[]>;
  public searchTerm = '';

  private searchSubject = new Subject<string>();
  private reloadArticleList = new Subject<void>();

  ngOnInit() {
    this.articles$ = merge(
      this.searchSubject.pipe(
        startWith(this.searchTerm),
        debounceTime(300),
        distinctUntilChanged()
      ),
      this.reloadArticleList
    ).pipe(switchMap(() => this.articleService.getArticles(this.searchTerm)));
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
