import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {
  constructor(private router: Router) {}
  startOver() {
    this.router.navigate(['/']);
  }
} 