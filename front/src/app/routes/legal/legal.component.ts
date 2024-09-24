import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export default class LegalComponent implements OnInit {
  chrono = 0;

  constructor(private readonly cdref: ChangeDetectorRef) {
    interval(1000)
      .pipe(
        tap(x => {
          console.log('x: ', x);
          this.chrono = x;
          this.cdref.markForCheck();
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
