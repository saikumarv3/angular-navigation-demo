import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { Page, Card, Question, TextQuestion, EmailQuestion, TelQuestion, DateQuestion, DropdownQuestion, RadioQuestion, CheckboxQuestion } from '../../new-page-types';

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
  @Input() answers: { [key: string]: string | string[] } = {};
  @Input() isFormValid: boolean = true;
  @Input() hasNext: boolean = true;
  @Input() validationErrors: { [key: string]: string } = {};
  @Input() hasAttemptedNext: boolean = false;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();
  @Output() answerChange = new EventEmitter<{ questionId: string; answer: string | string[] }>();
  @Output() blur = new EventEmitter<{ questionId: string }>();

  onAnswerChange(questionId: string, value: string | string[]): void {
    this.answers[questionId] = value;
    this.answerChange.emit({ questionId, answer: value });
  }

  onBlur(questionId: string): void {
    this.blur.emit({ questionId });
  }

  onExit(): void {
    this.exit.emit();
  }

  showError(question: Question): boolean {
    return this.hasAttemptedNext && 
           ((question.required && !this.answers[question.id]) || 
            (this.validationErrors[question.id] !== undefined));
  }

  getErrorMessage(question: Question): string {
    if (this.validationErrors[question.id]) {
      return this.validationErrors[question.id];
    }
    if (question.required && !this.answers[question.id]) {
      return `Please ${this.getQuestionTypeAction(question)}`;
    }
    return '';
  }

  private getQuestionTypeAction(question: Question): string {
    switch (question.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'date':
        return 'enter a value';
      case 'dropdown':
      case 'radio':
        return 'select an option';
      case 'checkbox':
        return 'select at least one option';
      default:
        return 'complete this field';
    }
  }

  isOptionSelected(questionId: string, option: string): boolean {
    const answer = this.answers[questionId];
    return Array.isArray(answer) ? answer.includes(option) : false;
  }

  onCheckboxChange(questionId: string, option: string, checked: boolean): void {
    const currentAnswer = this.answers[questionId] || [];
    const answerArray = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    
    if (checked) {
      answerArray.push(option);
    } else {
      const index = answerArray.indexOf(option);
      if (index > -1) {
        answerArray.splice(index, 1);
      }
    }
    
    this.answers[questionId] = answerArray;
    this.answerChange.emit({ questionId, answer: answerArray });
  }

  // Type guards
  isTextQuestion(question: Question): question is TextQuestion {
    return question.type === 'text';
  }

  isEmailQuestion(question: Question): question is EmailQuestion {
    return question.type === 'email';
  }

  isTelQuestion(question: Question): question is TelQuestion {
    return question.type === 'tel';
  }

  isDateQuestion(question: Question): question is DateQuestion {
    return question.type === 'date';
  }

  isDropdownQuestion(question: Question): question is DropdownQuestion {
    return question.type === 'dropdown';
  }

  isRadioQuestion(question: Question): question is RadioQuestion {
    return question.type === 'radio';
  }

  isCheckboxQuestion(question: Question): question is CheckboxQuestion {
    return question.type === 'checkbox';
  }
} 