// generate angular component name ArticlePreviewComponent

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-preview',
  template: `
    <div class="article-preview">
      <h2>It is working</h2>
    </div>
  `,
  styles: [
    `
    .article-preview {
      border: 1px solid #ccc;
      padding: 10px;
      margin-bottom: 10px;
    }
    `
  ]
})

export class ArticlePreviewComponent implements OnInit {
    ngOnInit(){
        console.log('Articl Preview Component');
    }
}