import { Component, Input } from "@angular/core";
import { Article } from "../models/article.model";
import { ArticleListConfig } from "../models/article-list-config.model";
import { ArticleService } from "../services/articles.service";
import ArticlePreviewComponent from "./article-preview.component";

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
                <app-article-preview [article]="article" />
            } @empty {
                <div class="text-center text-muted p-4">
                    <i class="ion-sad-outline ion-3x"></i>
                    <p>No articles are here... yet.</p>
                </div>
            }
        }
    `,
    imports: [ArticlePreviewComponent],
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