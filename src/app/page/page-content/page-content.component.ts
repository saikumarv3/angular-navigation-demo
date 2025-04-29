import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationButtonsComponent } from '../navigation-buttons/navigation-buttons.component';
import { PrefillInfoComponent } from '../prefill-info/prefill-info.component';
import { Page, Question, ValidationRule, VisibilityCondition, Card } from '../../page.data';

@Component({
  selector: 'app-page-content',
  standalone: true,
  imports: [CommonModule, FormsModule, NavigationButtonsComponent, PrefillInfoComponent],
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {
  @Input() title: string = '';
  @Input() currentPageData: Page | null = null;
  @Input() isFormValid = true;
  @Input() hasNext = true;
  @Input() validationErrors: { [key: string]: boolean } = {};
  @Input() answers: { [key: string]: string | string[] } = {};
  @Input() isPrefillMode = false;
  @Input() showErrors: boolean = false;
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();
  @Output() answerChange = new EventEmitter<{ questionId: string; answer: string | string[] }>();
  @Output() blur = new EventEmitter<string>();

  ngOnInit() {
    // Initialize empty answers for dropdown questions
    if (this.currentPageData?.cards) {
      this.currentPageData.cards.forEach(card => {
        card.questions.forEach(question => {
          if (question.type === 'dropdown' && !this.answers[question.id]) {
            this.answers[question.id] = '';
          }
          // Set default option value if condition is met
          if (this.shouldShowDefaultOption(question)) {
            const defaultValue = this.getDefaultOptionValue(question);
            this.answers[question.id] = defaultValue;
            this.answerChange.emit({ questionId: question.id, answer: defaultValue });
          }
        });
      });
    }
  }

  shouldShowDefaultOption(question: Question): boolean {
    if (!question.defaultOption?.condition) return false;
    
    const { questionId, expectedValue, operator = 'equals' } = question.defaultOption.condition;
    const dependentValue = this.answers[questionId];
    
    const shouldShow = this.evaluateCondition(dependentValue, expectedValue, operator);
    
    // If we should show the default option, ensure the answer is set
    if (shouldShow && question.defaultOption?.value) {
      this.answers[question.id] = question.defaultOption.value;
      this.answerChange.emit({ questionId: question.id, answer: question.defaultOption.value });
    }
    
    return shouldShow;
  }

  getDefaultOptionValue(question: Question): string {
    return question.defaultOption?.value || '';
  }

  getDefaultOptionWarning(question: Question): string {
    return question.defaultOption?.warningMessage || '';
  }

  private evaluateCondition(value: any, expectedValue: any, operator: string): boolean {
    switch (operator) {
      case 'equals':
        return value === expectedValue;
      case 'notEquals':
        return value !== expectedValue;
      case 'contains':
        return Array.isArray(value) ? value.includes(expectedValue) : value?.includes(expectedValue);
      case 'notContains':
        return Array.isArray(value) ? !value.includes(expectedValue) : !value?.includes(expectedValue);
      case 'greaterThan':
        return value > expectedValue;
      case 'lessThan':
        return value < expectedValue;
      default:
        return false;
    }
  }

  onAnswerChange(questionId: string, event: any) {
    const value = event.target.value;
    // For radio buttons, we need to ensure the value is set immediately
    if (event.target.type === 'radio') {
      this.answers[questionId] = value;
      this.answerChange.emit({ questionId, answer: value });
    } else {
      this.answers[questionId] = value;
      this.answerChange.emit({ questionId, answer: value });
    }
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

  private evaluateVisibility(conditions: VisibilityCondition[] | undefined): boolean {
    if (!conditions || conditions.length === 0) {
      return true;
    }

    return conditions.every(condition => {
      const dependentValue = this.answers[condition.questionId];
      return this.evaluateCondition(dependentValue, condition.expectedValue, condition.operator || 'equals');
    });
  }

  isQuestionVisible(question: Question): boolean {
    return this.evaluateVisibility(question.visibilityConditions);
  }

  isCardVisible(card: Card): boolean {
    return this.evaluateVisibility(card.visibilityConditions);
  }

  get productType(): string {
    const value = this.answers['product-type'];
    return Array.isArray(value) ? value[0] : value;
  }

  get state(): string {
    const value = this.answers['purchase-state'];
    return Array.isArray(value) ? value[0] : value;
  }

  onNext() {
    console.log('Current Answers:', this.answers);
    this.next.emit();
  }
} 