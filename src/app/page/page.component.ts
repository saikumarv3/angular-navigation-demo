import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PAGES, Page } from './../page.data';
import { PrefillService } from '../services/prefill.service';
import { PageContentComponent } from './page-content/page-content.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { CrossOverValidationService } from '../services/cross-over-validation.service';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PageContentComponent, AlertBarComponent],
  providers: [CrossOverValidationService],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  currentPageData: Page | null = null;
  answers: { [key: string]: string | string[] } = {};
  validationErrors: { [key: string]: boolean } = {};
  showBackError = false;
  isPrefillMode = false;
  crossOverMessages: string[] = [];
  hasAttemptedNext = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private prefillService: PrefillService,
    private crossOverValidationService: CrossOverValidationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      this.isPrefillMode = this.router.url.includes('/prefill');
      this.currentPageData = PAGES.find(page => page.id === pageId) || null;
      
      if (this.isPrefillMode) {
        this.answers = this.prefillService.getAnswers();
        this.checkCrossOverValidation();
      }
    });
  }

  get hasNext(): boolean {
    if (!this.currentPageData) return false;
    const currentIndex = PAGES.findIndex(page => page.id === this.currentPageData?.id);
    return currentIndex < PAGES.length - 1;
  }

  get nextPageId(): string | null {
    if (!this.currentPageData) return null;
    const currentIndex = PAGES.findIndex(page => page.id === this.currentPageData?.id);
    return PAGES[currentIndex + 1]?.id || null;
  }

  onNext() {
    this.hasAttemptedNext = true;
    
    if (!this.isFormValid) {
      return;
    }

    this.navigateToNextPage();
  }

  private navigateToNextPage() {
    const nextPageId = this.nextPageId;
    if (nextPageId) {
      this.hasAttemptedNext = false;
      this.validationErrors = {};
      this.crossOverMessages = [];
      
      const route = this.isPrefillMode 
        ? ['/page', nextPageId, 'prefill']
        : ['/page', nextPageId];
      this.router.navigate(route);
      window.scrollTo(0, 0);
    }
  }

  onBack() {
    this.showBackError = true;
    setTimeout(() => {
      this.showBackError = false;
    }, 3000);
  }

  onExit() {
    this.router.navigate(['/welcome']);
  }

  onAnswerChange(event: { questionId: string, answer: string | string[] }) {
    this.answers[event.questionId] = event.answer;
    this.checkCrossOverValidation();
  }

  private checkCrossOverValidation() {
    this.crossOverValidationService.checkCrossOverValidation(this.answers)
      .subscribe((messages: string[]) => {
        this.crossOverMessages = messages;
      });
  }

  get isFormValid(): boolean {
    if (!this.currentPageData?.cards) return true;
    
    if (!this.hasAttemptedNext) {
      return true;
    }

    let hasAnyValidationErrors = false;

    this.currentPageData.cards.forEach(card => {
      card.questions.forEach(question => {
        if (question.required) {
          const answer = this.answers[question.id];
          const hasAnswer = answer !== undefined && answer !== null && answer !== '';
          
          this.validationErrors[question.id] = !hasAnswer;
          
          if (!hasAnswer) {
            hasAnyValidationErrors = true;
          }
        }
      });
    });

    const allRequiredQuestionsAnswered = this.currentPageData.cards.every(card =>
      card.questions.every(question => {
        if (!question.required) return true;
        const answer = this.answers[question.id];
        return answer !== undefined && answer !== null && answer !== '';
      })
    );

    return !hasAnyValidationErrors && this.crossOverMessages.length === 0 && allRequiredQuestionsAnswered;
  }

  onBlur(questionId: string) {
    if (!this.hasAttemptedNext) return;

    const question = this.currentPageData?.cards?.flatMap(card => card.questions)
      .find(q => q.id === questionId);

    if (question?.required) {
      const answer = this.answers[questionId];
      this.validationErrors[questionId] = !answer || answer === '';
    }
  }

  ngOnDestroy() {
    // Cleanup code if needed
  }
}
