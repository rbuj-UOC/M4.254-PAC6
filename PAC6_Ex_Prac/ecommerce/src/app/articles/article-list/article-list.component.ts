import { Component } from '@angular/core';
import { Article } from "../../model/article";
import { ArticleQuantityChange } from '../../model/article-quantity-change';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleService } from '../../serveis/article.service';

@Component({
  selector: 'app-article-list',
  template: `
    <div class="article-list">
      <app-article-item [article]="articleObj"
                        (quantityChange)="onQuantityChange($event)"
                        *ngFor="let articleObj of articles$ | async"></app-article-item>
    </div>
  `,
  styles: `
    .article-list {
        display: flex;
        padding: 10px;
    }
  `
})
export class ArticleListComponent {

  public articles$: Observable<Article[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articles$ = this.articleService.getArticles();
  }

  onQuantityChange(change: ArticleQuantityChange) {
    this.articleService.changeQuantity(change.article.id, change.changeInQuantity);
  }
}
