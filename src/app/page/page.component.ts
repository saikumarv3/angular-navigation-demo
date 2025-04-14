import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PageContentComponent } from './page-content/page-content.component';
import { Page } from '../new-page-types';
import { PAGES } from '../page.data';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { CrossOverValidationService } from '../services/cross-over-validation.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, PageContentComponent, AlertBarComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  currentPageIndex = 0;
  currentPageData: Page = PAGES[0];
  answers: { [key: string]: string | string[] } = {};
  isFormValid = true;
  validationErrors: { [key: string]: string | boolean } = {};
  showBackError = false;
  showLanError = false;
  isCheckingLan = false;
  crossOverMessages: string[] = [];
  hasAttemptedNext = false;
  PAGES = PAGES;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crossOverValidationService: CrossOverValidationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      const pageIndex = PAGES.findIndex((page: Page) => page.title === pageId);
      if (pageIndex !== -1) {
        this.currentPageIndex = pageIndex;
        this.updatePageData();
      }
    });
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  updatePageData(): void {
    this.currentPageData = PAGES[this.currentPageIndex];
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
          this.validationErrors[question.id] = 'This field is required';
          isValid = false;
        }
      });
    });

    this.isFormValid = isValid;
  }

  handleNext(): void {
    if (this.currentPageIndex < PAGES.length - 1) {
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
    if (confirm('Are you sure you want to exit? All progress will be lost.')) {
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
