import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { BehaviorSubject, distinctUntilChanged, map, Observable, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtService } from "./jwt.service";
import { LoginModel } from "../models/login.model";
import { RegisterModel } from "../models/register.model";

@Injectable({ providedIn: 'root' }) 
export class UserService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    public isAuthenticated = this.currentUser.pipe(map(user => !!user));

    constructor(
        private readonly http: HttpClient,
        private readonly jwtService: JwtService,
        private readonly router: Router
    ){}

    setAuth(user: User){
        this.jwtService.setToken(user.token);
        this.currentUserSubject.next(user);
    }

    removeAuth(){
        this.jwtService.destroyToken();
        this.currentUserSubject.next(null);
    }

    login(credentials: LoginModel): Observable<{user: User}>{
        return this.http
            .post<{user: User}>("/users/login", {user: credentials})
            .pipe(tap(({ user }) => this.setAuth(user)));
    }

    registration(credentials: RegisterModel): Observable<{user: User}>{
        return this.http
            .post<{user: User}>("/users", { users: credentials })
            .pipe(tap(({ user }) => this.setAuth(user)));
    }

    logout() {
        this.removeAuth();
        void this.router.navigate(['/']); 
    }

}