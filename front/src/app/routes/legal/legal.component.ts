import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class LegalComponent implements OnInit {
  chrono = 0;

  constructor() {
    interval(1000)
      .pipe(
        tap(x => {
          console.log('x: ', x);
          this.chrono = x;
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
