import { Injectable } from '@angular/core';

const tokenKey = 'techBloggerIO.jwtToken';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
    getToken(): string {
      return window.localStorage[tokenKey];
    }
  
    setToken(token: string) {
      window.localStorage[tokenKey] = token;
    }
  
    destroyToken() {
      window.localStorage.removeItem(tokenKey);
    }
}