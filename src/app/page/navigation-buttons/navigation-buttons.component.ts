import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  imports: [CommonModule, ConfirmationDialogComponent],
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent {
  @Input() hasNext: boolean = false;
  @Input() isFormValid: boolean = true;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();

  showExitDialog = false;

  onExit() {
    console.log('Exit button clicked');
    this.showExitDialog = true;
  }

  onExitConfirmed() {
    console.log('Exit confirmed');
    this.showExitDialog = false;
    this.exit.emit();
  }

  onExitCancelled() {
    console.log('Exit cancelled');
    this.showExitDialog = false;
  }
} 