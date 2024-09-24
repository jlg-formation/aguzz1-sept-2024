import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { catchError, finalize, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-async-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './async-button.component.html',
  styleUrl: './async-button.component.scss',
})
export class AsyncButtonComponent {
  @Input()
  label = '';

  @Input()
  action: Observable<void> = of(undefined);

  @Input()
  icon = faCircleNotch;

  @Output()
  whenError = new EventEmitter<string>();

  @Output()
  whenStartAction = new EventEmitter<void>();

  isDoing = false;

  faCircleNotch = faCircleNotch;

  doAction(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.isDoing = true;
        this.whenStartAction.emit();
        return this.action;
      }),
      catchError(err => {
        console.log('xxx err: ', err);
        if (err instanceof Error) {
          this.whenError.emit(err.message);
          return of(undefined);
        }
        if (typeof err === 'string') {
          this.whenError.emit(err);
          return of(undefined);
        }
        this.whenError.emit('Erreur Technique');
        return of(undefined);
      }),
      finalize(() => {
        this.isDoing = false;
      })
    );
  }
}
