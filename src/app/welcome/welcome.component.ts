import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrefillService } from '../services/prefill.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <div class="welcome-container">
      <h1>Welcome to the Setup Wizard</h1>
      <p>This wizard will help you configure your new device.</p>
      
      <div class="button-group">
        <button (click)="startWizard()" class="start-button">
          Start Setup
        </button>
        
        <button (click)="startWithPrefill()" class="prefill-button">
          Start with Sample Data
        </button>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    p {
      color: #7f8c8d;
      margin-bottom: 2rem;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .start-button, .prefill-button {
      padding: 1rem 2rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .start-button {
      background-color: #3498db;
      color: white;

      &:hover {
        background-color: #2980b9;
      }
    }

    .prefill-button {
      background-color: #2ecc71;
      color: white;

      &:hover {
        background-color: #27ae60;
      }
    }
  `]
})
export class WelcomeComponent {
  constructor(
    private router: Router,
    private prefillService: PrefillService
  ) {}

  startWizard() {
    this.prefillService.clearAnswers();
    this.router.navigate(['/page', 'product-selection']);
  }

  startWithPrefill() {
    this.router.navigate(['/page', 'product-selection', 'prefill']);
  }
}
