import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles.service';
import { Article } from '../../models/article.model';
import { DatePipe } from '@angular/common';
import { LineBreaksPipe } from '../../../../shared/pipes/line-breaks.pipe';
import { ArticleCommentComponent } from '../../components/article-comment.component';
import { User } from '../../../../core/auth/models/user.model';
import { Comment } from '../../models/comment.model';
import { FormControl } from '@angular/forms';
import { Errors } from '../../../../core/models/errors.model';
import { CommentService } from '../../services/comment.service';
import { UserService } from '../../../../core/auth/services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { catchError, combineLatest, throwError } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Profile } from '../../../profile/models/profile.model';
import { ListErrorsComponent } from '../../../../shared/components/list-errors/list-errors.component';

@Component({
  selector: 'app-article',
  imports: [DatePipe, LineBreaksPipe, ArticleCommentComponent, RouterLink, ListErrorsComponent],
  templateUrl: './article.component.html',
})
export default class ArticleComponent implements OnInit {
  article!: Article;
  currentUser!: User | null;
  comments: Comment[] = [];
  canModify: boolean = false;

  commentControl = new FormControl<string>("", {nonNullable: true});
  commentFormErrors: Errors | null = null;

  isSubmitting = false;
  isDeleting = false;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.params["slug"];

    combineLatest([
      this.articleService.getArticle(slug),
      this.commentService.getComments(slug),
      this.userService.currentUser,
    ]).pipe(
      catchError((err) => {
        void this.router.navigate(["/"]);
        return throwError(() => err);
      }),
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe(([article, comments, currentUser]) => {
      this.article = article;
      this.comments = comments;
      this.currentUser = currentUser;
      this.canModify = currentUser?.username === article.author.username;
    })
  }

  onToggleFavorite(favorited: boolean){
    this.article.favorited = favorited;
    if (favorited){
      this.article.favoritesCount++;
    }
    else {
      this.article.favoritesCount--;
    }
  }

  toggleFollowing(profile: Profile): void {
    this.article.author.following = profile.following;
  }

  deleteArticle(): void {
    this.isDeleting = true;

    this.articleService.delete(this.article.slug).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        void this.router.navigate(["/"]);
      });
  }

  addComment(){
    console.log('add comment pressed');
  }

  deleteComment(comment: Comment){
    console.log('comments deleted');
  }
}
