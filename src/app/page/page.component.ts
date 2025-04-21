import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PageContentComponent } from './page-content/page-content.component';
import { Page } from '../new-page-types';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { CrossOverValidationService } from '../services/cross-over-validation.service';
import { PrefillService } from '../services/prefill.service';
import { TrisionService } from '../services/trision.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, PageContentComponent, AlertBarComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  currentPageIndex = 0;
  currentPageData: Page | null = null;
  answers: { [key: string]: string | string[] } = {};
  isFormValid = true;
  validationErrors: { [key: string]: string } = {};
  isCheckingLan = false;
  crossOverMessages: string[] = [];
  hasAttemptedNext = false;
  PAGES: Page[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crossOverValidationService: CrossOverValidationService,
    private prefillService: PrefillService,
    private trisionService: TrisionService
  ) {}

  ngOnInit(): void {
    this.loadPageData();
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      const pageIndex = this.PAGES.findIndex((page: Page) => page.title === pageId);
      if (pageIndex !== -1) {
        this.currentPageIndex = pageIndex;
        this.updatePageData();
      }
    });

    // Get prefill data from history state
    const prefillData = history.state.prefillData;
    if (prefillData) {
      this.answers = prefillData;
      console.log('Prefill data loaded:', this.answers);
    }
  }

  private loadPageData(): void {
    this.PAGES = this.trisionService.getPageStructure();
    this.currentPageData = this.PAGES[this.currentPageIndex];
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  updatePageData(): void {
    this.currentPageData = this.PAGES[this.currentPageIndex];
    this.validateForm();
  }

  handleAnswerChange(event: { questionId: string; answer: string | string[] }): void {
    this.answers[event.questionId] = event.answer;
    this.validateForm();
    this.checkCrossOverValidation();
  }

  handleBlur(event: { questionId: string }): void {
    this.validateForm();
  }

  validateForm(): void {
    this.validationErrors = {};
    let isValid = true;

    if (!this.currentPageData) return;

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

  handleNext(): void {
    this.hasAttemptedNext = true;
    this.validateForm();
    
    if (this.isFormValid) {
      // Navigate to advisor terms page
      this.router.navigate(['/advisor-terms']);
    }
  }

  handleBack(): void {
    this.router.navigate(['/']);
  }

  handleExit(): void {
    if (confirm('Are you sure you want to exit?')) {
      this.router.navigate(['/']);
    }
  }

  private checkCrossOverValidation(): void {
    this.crossOverValidationService.checkCrossOverValidation(this.answers)
      .subscribe((messages: string[]) => {
        this.crossOverMessages = messages;
      });
  }
}
