import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PageContentComponent } from './page-content/page-content.component';
import { Page, ValidationRule } from '../new-page-types';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { CrossOverValidationService } from '../services/cross-over-validation.service';
import { PrefillService } from '../services/prefill.service';

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
  validationErrors: { [key: string]: string | boolean } = {};
  isCheckingLan = false;
  crossOverMessages: string[] = [];
  hasAttemptedNext = false;
  PAGES: Page[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crossOverValidationService: CrossOverValidationService,
    private prefillService: PrefillService
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
  }

  private loadPageData(): void {
    this.prefillService.getPrefillData('prefillsampledatafile1.json').subscribe({
      next: (data) => {
        this.PAGES = [data];
        this.currentPageData = data;
      },
      error: (error) => {
        console.error('Error loading page data:', error);
      }
    });
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
        if (question.required && !this.answers[question.id]) {
          this.validationErrors[question.id] = true;
          isValid = false;
        }
      });
    });

    this.isFormValid = isValid;
  }

  handleNext(): void {
    if (this.currentPageIndex < this.PAGES.length - 1) {
      this.currentPageIndex++;
      this.updatePageData();
    }
  }

  handleBack(): void {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
      this.updatePageData();
    }
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
