import { Component } from '@angular/core';
import { ArticleListConfig } from '../../models/article-list-config.model';
import ArticleListComponent from '../../components/article-list.component';

@Component({
  selector: 'app-home',
  imports: [ArticleListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export default class HomeComponent {
  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {},
  };


}
