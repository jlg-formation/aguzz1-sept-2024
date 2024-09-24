import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { finalize, Observable, of, switchMap } from 'rxjs';

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

  isDoing = false;

  faCircleNotch = faCircleNotch;

  doAction(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.isDoing = true;
        return this.action;
      }),
      finalize(() => {
        this.isDoing = false;
      })
    );
  }
}
