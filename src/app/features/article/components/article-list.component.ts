import { Component, Input } from "@angular/core";
import { Article } from "../models/article.model";
import { ArticleListConfig } from "../models/article-list-config.model";
import { ArticleService } from "../services/articles.service";
import { DatePipe } from "@angular/common";

@Component({
    selector: 'app-article-list',
    template: `
    @if (loading) {
            <div class="text-center p-3">
                <span class="spinner-border text-primary" role="status"></span>
                <p>Loading articles...</p>
            </div>
        }

        @if (!loading) {
            @for (article of results; track article.slug) {
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
                                <i class="ion-calendar"></i> {{ article.createdAt | date:'longDate' }}
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
            } @empty {
                <div class="text-center text-muted p-4">
                    <i class="ion-sad-outline ion-3x"></i>
                    <p>No articles are here... yet.</p>
                </div>
            }
        }
    `,
    imports: [DatePipe],
    standalone: true
})

export default class ArticleListComponent {
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