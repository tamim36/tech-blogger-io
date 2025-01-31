import { Component, Input } from "@angular/core";
import { Article } from "../models/article.model";
import { ArticleListConfig } from "../models/article-list-config.model";
import { ArticleService } from "../services/articles.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-article-list',
    template: `
        @if (loading) {
        <div class="article-preview">Loading articles...</div>
        }

        @if (!loading) {
        @for (article of results; track article.slug) {
            <div class="article-preview">
            <div class="article-meta">
                <a href="/profile">
                <img [src]="article.author.image" />
                </a>
                <div class="info">
                <a class="author" href="/author">
                    {{ article.author.username }}
                </a>
                <span class="date">{{ article.createdAt | date:'longDate' }}</span>
                </div>
            </div>
            <a href="/details"  class="preview-link">
                <h1>{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                @for (tag of article.tagList; track tag) {
                    <li class="tag-default tag-pill tag-outline">{{ tag }}</li>
                }
                </ul>
            </a>
            </div>
        } @empty {
            <div class="article-preview">No articles are here... yet.</div>
        }
        }
    `,
    imports: [DatePipe],
    standalone: true
})

export class ArticleListComponent {
    results: Article[] = [];
    loading = false;

    @Input({ required: true }) limit!: number;
    @Input()
    set config(config: ArticleListConfig) {
        if (config) {
            this.runQuery(config);
        }
    }

    constructor(private articleService: ArticleService) { }

    runQuery(config: ArticleListConfig) {
        this.loading = true;
        this.results = [];

        config.filters.limit = this.limit;

        this.articleService.query(config).subscribe(data => {
            this.loading = false;
            this.results = data.articles;
        });
    }
}