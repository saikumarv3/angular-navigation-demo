import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { Page } from '../../page.data';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationButtonsComponent],
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent {
  @Input() title: string = '';
  @Input() currentPageData: Page | null = null;
  @Input() answers: { [key: string]: string } = {};
  @Input() hasNext: boolean = false;
  @Input() isFormValid: boolean = true;
  @Input() validationErrors: { [key: string]: boolean } = {};

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() onBlur = new EventEmitter<string>();
  @Output() exit = new EventEmitter<void>();

  showError(question: any): boolean {
    return this.validationErrors[question.id] || false;
  }

  onExit() {
    console.log('PageContentComponent: Exit event received');
    this.exit.emit();
  }
} 