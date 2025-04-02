import { Component, Input } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-alert-bar',
  standalone: true,
  imports: [NgIf, NgFor],
  template: `
    <div *ngIf="show" class="alert-bar">
      <div class="alert-content">
        <span class="alert-icon">⚠️</span>
        <div class="alert-messages">
          <div *ngFor="let msg of messages" class="alert-message">
            {{msg}}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alert-bar {
      background-color: #dc3545;
      color: white;
      padding: 1rem;
      margin-bottom: 1rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .alert-content {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .alert-icon {
      font-size: 1.2rem;
      margin-top: 0.2rem;
    }

    .alert-messages {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .alert-message {
      font-size: 1rem;
      font-weight: 500;
    }
  `]
})
export class AlertBarComponent {
  @Input() show = false;
  @Input() messages: string[] = [];
} 