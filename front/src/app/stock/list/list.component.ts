import { Component, computed, OnInit } from '@angular/core';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { Article } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { AsyncButtonComponent } from '../../widgets/async-button/async-button.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, AsyncButtonComponent],
})
export default class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;

  selectedArticles = new Set<Article>();
  errorMsg = '';

  totalArticles = computed(() => {
    return this.articleService.articles()?.length ?? 0;
  });

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleService.articles() === undefined) {
      this.articleService.load().subscribe();
    }
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        return this.articleService.load();
      }),
      catchError(err => {
        console.log('err: ', err);
        return of(undefined);
      })
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';

        const ids = [...this.selectedArticles].map(a => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => this.articleService.load()),
      tap(() => {
        this.selectedArticles.clear();
      }),
      catchError(err => {
        console.log('err: ', err);
        this.errorMsg = 'Cannot suppress';
        return of(undefined);
      })
    );
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
