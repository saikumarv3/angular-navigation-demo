import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor-terms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './advisor-terms.component.html',
  styleUrls: ['./advisor-terms.component.scss']
})
export class AdvisorTermsComponent {
  agreeToTerms: boolean = false;
  showError: boolean = false;

  constructor(private router: Router) {}

  handleAccept(): void {
    if (this.agreeToTerms) {
      this.router.navigate(['/success']);
    } else {
      this.showError = true;
    }
  }

  onCheckboxChange(): void {
    this.showError = false;
  }
} 