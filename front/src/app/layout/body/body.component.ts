import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class BodyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
