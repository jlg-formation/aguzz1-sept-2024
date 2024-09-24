import { Component, OnInit, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { NewArticle } from '../../interfaces/article';
import { ArticleService } from '../../services/article.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    name: ['Truc', [Validators.required]],
    price: [0, [Validators.required]],
    qty: [1, [Validators.required]],
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

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
