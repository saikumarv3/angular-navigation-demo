import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-error-bar',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div *ngIf="show" class="error-bar">
      <div class="error-content">
        <span class="error-icon">⚠️</span>
        <div class="error-messages">
          <div *ngFor="let msg of messages" class="error-message">
            {{msg}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-bar {
      background-color: #dc3545;
      color: white;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error-content {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .error-icon {
      font-size: 1.2rem;
      margin-top: 0.2rem;
    }

    .error-messages {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .error-message {
      font-size: 1rem;
      font-weight: 500;
    }
  `]
})
export class ErrorBarComponent {
  @Input() show = false;
  @Input() messages: string[] = [];
} 