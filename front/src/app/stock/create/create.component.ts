import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  catchError,
  delay,
  finalize,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule],
})
export default class CreateComponent implements OnInit {
  afb = new FormBuilder();
  errorMsg = signal('');
  f = this.afb.nonNullable.group({
    name: ['Truc', [Validators.required, Validators.maxLength(10)], []],
    price: [0, [Validators.required]],
    qty: [1, [Validators.required]],
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  nameErrorMsg = () => {
    if (this.f.controls['name'].touched === false) {
      return '';
    }
    if (this.f.controls['name'].errors?.['required']) {
      return 'Champ obligatoire';
    }
    if (this.f.controls['name'].errors?.['maxlength']) {
      return 'Champ trop long';
    }
    return '';
  };

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isAdding = true;
      }),
      delay(1000),
      switchMap(() => this.articleService.add(this.f.getRawValue())),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
      catchError(err => {
        console.log('err: ', err);
        if (err instanceof Error) {
          this.errorMsg.set(err.message);
        }
        return of(undefined);
      }),
      finalize(() => {
        this.isAdding = false;
      })
    );
  }
}
