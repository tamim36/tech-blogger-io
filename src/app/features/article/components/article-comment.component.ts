import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-article-comment',
  template: `
    <div class="comments-section mt-4">
      <h5 class="mb-3">Comments</h5>

      @for (comment of comments; track comment.id) {
      <div class="comment-card p-3 mb-3 border rounded">
        <div class="d-flex align-items-center mb-2">
          <img
            [src]="comment.author.image"
            alt="User avatar"
            class="rounded-circle me-3"
            style="width: 40px; height: 40px;"
          />
          <div>
            <strong class="d-block">{{ comment.author.username }}</strong>
            <small class="text-muted">{{ comment.createdAt }}</small>
          </div>
        </div>
        <p class="mb-0"> {{ comment.body }} </p>
      </div>
      }
    </div>
  `,
  imports: [],
  standalone: true,
})
export class ArticleCommentComponent {
  comments: Comment[] = [];
  @Input()
  set slug(articleSlug: string) {
    if (articleSlug) {
      this.getComments(articleSlug);
    }
  }

  constructor(private readonly commentService: CommentService) {}

  getComments(articleSlug: string) {
    this.commentService.getComments(articleSlug).subscribe((response) => {
        console.log("comments fetched successfully", response);
      this.comments = response;
    });
  }
}
