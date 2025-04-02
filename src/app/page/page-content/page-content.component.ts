import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Page, Question } from '../../page.data';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent {
  @Input() title = '';
  @Input() currentPageData: Page | null = null;
  @Input() hasNext = false;
  @Input() isFormValid = false;
  @Input() answers: { [key: string]: string } = {};
  @Input() touched: { [key: string]: boolean } = {};
  @Input() showValidationErrors = false;

  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() onBlur = new EventEmitter<string>();

  showError(question: Question): boolean {
    return (this.showValidationErrors || this.touched[question.id]) && 
           (question.required ?? true) && 
           !this.answers[question.id];
  }
} 