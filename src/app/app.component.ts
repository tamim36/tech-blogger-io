import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { ArticleListComponent } from './features/article/components/article-list.component';
import { ArticleListConfig } from './features/article/models/article-list-config.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet],
  template: `
    <div class="container main-body">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'tech-blogger-io';
}
