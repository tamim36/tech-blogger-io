import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleListComponent } from './features/article/components/article-list.component';
import { ArticleListConfig } from './features/article/models/article-list-config.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArticleListComponent],
  template: `
    <div class="container">
      <app-article-list [limit]="10" [config]="listConfig" />
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tech-blogger-io';
  listConfig: ArticleListConfig = {
    type: '',
    filters: {}
  };
  
}
