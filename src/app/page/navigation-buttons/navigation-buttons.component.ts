import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
})
export class NavigationButtonsComponent {
  @Input() hasNext = false;
  @Input() isFormValid = true;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
} 