import { Component, Input } from '@angular/core';
import { ArticleService } from '../../services/articles.service';
import { Article } from '../../models/article.model';
import { DatePipe } from '@angular/common';
import { LineBreaksPipe } from '../../../../shared/pipes/line-breaks.pipe';
import { ArticleCommentComponent } from '../../components/article-comment.component';

@Component({
  selector: 'app-article',
  imports: [DatePipe, LineBreaksPipe, ArticleCommentComponent],
  templateUrl: './article.component.html',
})
export default class ArticleComponent {
  @Input()
  set slug(articleSlug: string) {
    if (articleSlug){
      this.getArticle(articleSlug);
    }
  }

  article: Article | undefined = undefined;
  constructor(private readonly articleService: ArticleService) {}

  getArticle(slug: string){
    this.articleService.getArticle(slug).subscribe((article) => {
      this.article = article;
    });
  }
}
