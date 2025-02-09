import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Comment } from "../models/comment.model";
import { JwtService } from "../../../core/auth/services/jwt.service";

@Injectable({ providedIn: 'root' })
export class CommentService {
    constructor(private readonly http: HttpClient, private readonly jwtService: JwtService){}

    getComments(articleSlug: string): Observable< Comment[] >{
        const headers = {
            Authorization: `Token ${this.jwtService.getToken()}`
        };
        return this.http
            .get<{ comments: Comment[] }>(`/articles/${articleSlug}/comments`)
            .pipe(map(res => res.comments));
    }

}