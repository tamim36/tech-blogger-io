// generate angular component name ArticlePreviewComponent

import { Component, Input } from '@angular/core';
import { Article } from '../models/article.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-preview',
  imports: [DatePipe],
  template: `
    <div class="card article-card">
      <div class="card-header d-flex align-items-center">
        <a href="/profile">
          <img [src]="article.author.image" class="author-img rounded-circle" />
        </a>
        <div class="info ms-2">
          <a class="author text-primary fw-bold" href="/author">
            {{ article.author.username }}
          </a>
          <span class="date d-block text-muted">
            <i class="ion-calendar"></i>
            {{ article.createdAt | date : 'longDate' }}
          </span>
        </div>
      </div>

      <div class="card-body">
        <a href="/details" class="preview-link text-decoration-none">
          <h5 class="card-title text-dark">{{ article.title }}</h5>
          <p class="card-text text-muted">{{ article.description }}</p>
          <span class="text-success">Read more...</span>
        </a>
        <ul class="tag-list list-inline mt-2">
          @for (tag of article.tagList; track tag) {
          <li class="list-inline-item badge bg-secondary">{{ tag }}</li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      .article-preview {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
      }
    `,
  ],
})
export default class ArticlePreviewComponent {
  @Input() article!: Article;
}
