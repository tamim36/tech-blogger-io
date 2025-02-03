import { Component, inject, OnInit } from '@angular/core';
import { ArticleListConfig } from '../../models/article-list-config.model';
import ArticleListComponent from '../../components/article-list.component';
import { TagsService } from '../../services/tags.service';
import { tap } from 'rxjs';
import { RxLet } from "@rx-angular/template/let"

@Component({
  selector: 'app-home',
  imports: [ArticleListComponent, RxLet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  tags: string[] = [];
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };

  tagsLoaded = false;
  tagsService = inject(TagsService);
  tags$ = this.tagsService
    .getTags()
    .pipe(tap(() => this.tagsLoaded = true));



}
