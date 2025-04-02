import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `<button (click)="start()">Begin</button>`
})
export class WelcomeComponent {
  constructor(private router: Router) {}
  start() { this.router.navigate(['/page', 'product-selection']); }
}
