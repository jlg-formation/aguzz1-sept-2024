import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import {
  delay,
  lastValueFrom,
  catchError,
  switchMap,
  timer,
  Observable,
  of,
  map,
} from 'rxjs';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle)),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
    );
  }

  load(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        return this.http.get<Article[]>(url);
      }),
      delay(1000),
      map((articles) => {
        this.articles = articles;
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Technical Error';
        return of(undefined);
      })
    );
  }

  remove(ids: string[]): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      switchMap(() =>
        this.http.delete<void>(url, {
          body: ids,
        })
      ),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
    );
  }
}
