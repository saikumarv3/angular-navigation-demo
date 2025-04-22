import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PageContentComponent } from './page-content/page-content.component';
import { Page } from '../new-page-types';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { CrossOverValidationService } from '../services/cross-over-validation.service';
import { PrefillService } from '../services/prefill.service';
import { TrisionService } from '../services/trision.service';
import { ContractSelectorComponent } from './contract-selector/contract-selector.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, PageContentComponent, AlertBarComponent, ContractSelectorComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  currentPageData: Page | null = null;
  answers: { [key: string]: string | string[] } = {};
  showPageContent = false;
  isPrefilled = false;
  currentPageIndex = 0;
  isFormValid = true;
  validationErrors: { [key: string]: string } = {};
  isCheckingLan = false;
  crossOverMessages: string[] = [];
  hasAttemptedNext = false;
  PAGES: Page[] = [];

  constructor(
    private trisionService: TrisionService,
    private prefillService: PrefillService,
    private router: Router,
    private route: ActivatedRoute,
    private crossOverValidationService: CrossOverValidationService
  ) {}

  ngOnInit(): void {
    console.log('PageComponent initialized');
    
    // Get prefill data from history state
    const prefillData = history.state.prefillData;
    this.isPrefilled = !!prefillData;
    
    if (prefillData) {
      console.log('PageComponent - Prefill data received:', prefillData);
      this.answers = { ...prefillData };
      console.log('PageComponent - Answers after prefill:', this.answers);
    }
    
    // Load page data
    this.loadPageData();
  }

  loadPageData(): void {
    this.PAGES = this.trisionService.getPageStructure();
    this.currentPageIndex = 0; // Reset to first page
    this.currentPageData = this.PAGES[this.currentPageIndex];
    this.showPageContent = true;
  }

  onPrefillSelected(showContent: boolean): void {
    this.showPageContent = showContent;
  }

  handleAnswerChange(event: { questionId: string; answer: string | string[] }): void {
    this.answers[event.questionId] = event.answer;
    this.validateForm();
    this.checkCrossOverValidation();
  }

  handleBlur(event: { questionId: string }): void {
    this.validateForm();
  }

  handleNext(): void {
    this.hasAttemptedNext = true;
    if (this.validateForm()) {
      this.router.navigate(['/advisor-terms']);
    }
  }

  handleBack(): void {
    this.router.navigate(['/welcome']);
  }

  handleExit(): void {
    if (confirm('Are you sure you want to exit?')) {
      this.router.navigate(['/']);
    }
  }

  validateForm(): boolean {
    if (!this.currentPageData) return false;

    this.validationErrors = {};
    let isValid = true;

    this.currentPageData.cards.forEach(card => {
      card.questions.forEach(question => {
        const answer = this.answers[question.id];
        const error = this.validateQuestion(question, answer);
        
        if (error) {
          this.validationErrors[question.id] = error;
          isValid = false;
        }
      });
    });

    this.isFormValid = isValid;
    return isValid;
  }

  private validateQuestion(question: any, answer: string | string[] | undefined): string | null {
    // Check required validation
    if (question.required && (!answer || (Array.isArray(answer) && answer.length === 0))) {
      return 'This field is required';
    }

    // If not required and no answer, no need to check other validations
    if (!answer) {
      return null;
    }

    // Check other validation rules
    if (question.validation) {
      for (const rule of question.validation) {
        switch (rule.type) {
          case 'pattern':
            if (typeof answer === 'string' && !new RegExp(rule.pattern).test(answer)) {
              return rule.message;
            }
            break;
          case 'minLength':
            if (typeof answer === 'string' && answer.length < rule.value) {
              return rule.message;
            }
            break;
          case 'maxLength':
            if (typeof answer === 'string' && answer.length > rule.value) {
              return rule.message;
            }
            break;
          case 'min':
            if (typeof answer === 'string' && parseFloat(answer) < rule.value) {
              return rule.message;
            }
            break;
          case 'max':
            if (typeof answer === 'string' && parseFloat(answer) > rule.value) {
              return rule.message;
            }
            break;
        }
      }
    }

    return null;
  }

  updateAnswers(answers: { [key: string]: string | string[] }): void {
    this.answers = { ...answers };
  }

  private checkCrossOverValidation(): void {
    this.crossOverValidationService.checkCrossOverValidation(this.answers)
      .subscribe((messages: string[]) => {
        this.crossOverMessages = messages;
      });
  }
}
