import { HttpClient, HttpParams } from "@angular/common/http";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Observable } from "rxjs";
import { Article } from "../models/article.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ArticleService {
    constructor(private readonly http: HttpClient){}

    query(config: ArticleListConfig): Observable<{ articles: Article[]; articlesCount: number }>{
        let params = new HttpParams();

        Object.keys(config.filters).forEach((key) => {
            // @ts-ignore
            params = params.set(key, config.filters[key]);
        })

        return this.http.get<{ articles: Article[]; articlesCount: number }>(
            "/articles" + (config.type === "feed" ? "/feed" : ""),
            { params },
        );
    }
}