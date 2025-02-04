import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./features/article/pages/home/home.component"),
    }, 
    {
        path: 'article/:slug',
        loadComponent: () => import("./features/article/pages/article/article.component"),
    }
];
