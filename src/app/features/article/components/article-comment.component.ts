import { Component, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';

@Component({
  selector: 'app-article-comment',
  template: `
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
  `,
  imports: [],
  standalone: true,
})
export class ArticleCommentComponent {
  @Input() comment!: Comment;
  
}
