import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { Page, Question, ValidationRule, VisibilityCondition, Card } from '../../page.data';

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
  @Input() isFormValid = true;
  @Input() hasNext = true;
  @Input() validationErrors: { [key: string]: boolean } = {};
  @Input() answers: { [key: string]: string | string[] } = {};
  @Input() isPrefillMode = false;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();
  @Output() answerChange = new EventEmitter<{ questionId: string, answer: string | string[] }>();
  @Output() blur = new EventEmitter<string>();

  ngOnChanges() {
    // Initialize empty answers for dropdown questions
    if (this.currentPageData?.cards) {
      this.currentPageData.cards.forEach(card => {
        card.questions.forEach(question => {
          if (question.type === 'dropdown' && !this.answers[question.id]) {
            this.answers[question.id] = '';
          }
        });
      });
    }
  }

  onAnswerChange(questionId: string, value: string | Event) {
    const answer = typeof value === 'string' ? value : (value.target as HTMLInputElement).value;
    this.answerChange.emit({ questionId, answer });
  }

  onCheckboxChange(questionId: string, option: string, isChecked: boolean) {
    const currentAnswers = (this.answers[questionId] as string[]) || [];
    let newAnswers: string[];
    
    if (isChecked) {
      newAnswers = [...currentAnswers, option];
    } else {
      newAnswers = currentAnswers.filter(ans => ans !== option);
    }
    
    this.answerChange.emit({ questionId, answer: newAnswers });
  }

  onBlur(questionId: string) {
    this.blur.emit(questionId);
  }

  onExit() {
    this.exit.emit();
  }

  showError(question: Question): boolean {
    return this.validationErrors[question.id] || false;
  }

  getAnswer(questionId: string): string | string[] | undefined {
    return this.answers[questionId];
  }

  isOptionSelected(questionId: string, option: string): boolean {
    const answer = this.getAnswer(questionId);
    if (Array.isArray(answer)) {
      return answer.includes(option);
    }
    return answer === option;
  }

  getErrorMessage(question: Question): string {
    if (!question.validation) {
      return 'This field is required';
    }

    const requiredRule = question.validation.find(rule => rule.type === 'required');
    if (requiredRule) {
      return requiredRule.message;
    }

    return 'Invalid input';
  }

  isQuestionVisible(question: Question): boolean {
    if (!question.visibilityConditions) {
      return true;
    }

    // Check all visibility conditions
    return question.visibilityConditions.every((condition: VisibilityCondition) => {
      if (!this.currentPageData?.cards) return true;
      
      const dependentQuestion = this.currentPageData.cards
        .flatMap(card => card.questions)
        .find((q: Question) => q.id === condition.questionId);
      
      if (!dependentQuestion) return true;

      const dependentValue = this.answers[condition.questionId];
      if (dependentValue === undefined || dependentValue === null) return false;

      switch (condition.operator) {
        case 'equals':
          return dependentValue === condition.expectedValue;
        case 'notEquals':
          return dependentValue !== condition.expectedValue;
        case 'contains':
          return String(dependentValue).includes(String(condition.expectedValue));
        case 'notContains':
          return !String(dependentValue).includes(String(condition.expectedValue));
        case 'greaterThan':
          return Number(dependentValue) > Number(condition.expectedValue);
        case 'lessThan':
          return Number(dependentValue) < Number(condition.expectedValue);
        default:
          return dependentValue === condition.expectedValue;
      }
    });
  }

  isCardVisible(card: Card): boolean {
    if (!card.visibilityConditions) {
      return true;
    }

    // Check all visibility conditions
    return card.visibilityConditions.every((condition: VisibilityCondition) => {
      const dependentValue = this.answers[condition.questionId];
      // Return false if the dependent question hasn't been answered yet
      if (dependentValue === undefined || dependentValue === null || dependentValue === '') {
        return false;
      }

      switch (condition.operator) {
        case 'equals':
          return dependentValue === condition.expectedValue;
        case 'notEquals':
          return dependentValue !== condition.expectedValue;
        case 'contains':
          return String(dependentValue).includes(String(condition.expectedValue));
        case 'notContains':
          return !String(dependentValue).includes(String(condition.expectedValue));
        case 'greaterThan':
          return Number(dependentValue) > Number(condition.expectedValue);
        case 'lessThan':
          return Number(dependentValue) < Number(condition.expectedValue);
        default:
          return dependentValue === condition.expectedValue;
      }
    });
  }
} 