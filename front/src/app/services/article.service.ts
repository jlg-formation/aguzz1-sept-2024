import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  catchError,
  delay,
  map,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import { Article, NewArticle } from '../interfaces/article';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles$ = new BehaviorSubject<Article[] | undefined>(undefined);
  articles = toSignal(this.articles$);
  errorMsg$ = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle)),
      catchError(err => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
    );
  }

  load(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg$.next('');
        return this.http.get<Article[]>(url);
      }),
      delay(1000),
      map(articles => {
        this.articles$.next(articles);
      }),
      catchError(err => {
        console.log('err: ', err);
        this.errorMsg$.next('Technical Error');
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
      catchError(err => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
    );
  }
}
