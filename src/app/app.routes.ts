import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./features/article/pages/home/home.component"),
    }, 
    {
        path: 'article',
        loadComponent: () => import("./features/article/components/article-list.component"),
    }
];
