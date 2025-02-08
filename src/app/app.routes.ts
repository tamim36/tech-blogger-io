import { Routes } from '@angular/router';
import { UserService } from './core/auth/services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./features/article/pages/home/home.component"),
    }, 
    {
        path: 'articles/:slug',
        loadComponent: () => import("./features/article/pages/article/article.component"),
    },
    {
        path: 'login',
        loadComponent: () => import("./core/auth/auth.component"),
        canActivate: [
            () => inject(UserService).isAuthenticated.pipe(map(isAuth => !isAuth)),
        ],
    },
    {
        path: 'register',
        loadComponent: () => import("./core/auth/auth.component"),
        canActivate: [
            () => inject(UserService).isAuthenticated.pipe(map(isAuth => !isAuth)),
        ]
    }
];
