import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PAGES, Page } from './../page.data';
import { LanService } from '../services/lan.service';
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
  showLanError = false;
  isCheckingLan = false;
  isPrefillMode = false;
  crossOverMessages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lanService: LanService,
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
    if (this.currentPageData?.id === 'product-selection') {
      this.isCheckingLan = true;
      this.showLanError = false;
      
      this.lanService.checkLan().subscribe({
        next: (success) => {
          this.isCheckingLan = false;
          if (success) {
            this.navigateToNextPage();
          } else {
            this.showLanError = true;
          }
        },
        error: () => {
          this.isCheckingLan = false;
          this.showLanError = true;
        }
      });
    } else {
      this.navigateToNextPage();
    }
  }

  private navigateToNextPage() {
    const nextPageId = this.nextPageId;
    if (nextPageId) {
      const route = this.isPrefillMode 
        ? ['/page', nextPageId, 'prefill']
        : ['/page', nextPageId];
      this.router.navigate(route);
      // Scroll to top of the page
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
    console.log('PageComponent: Exit event received, navigating to welcome');
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
    
    const hasValidationErrors = this.currentPageData.cards.some(card => 
      card.questions.some(question => {
        if (!question.required) return false;
        const hasAnswer = !!this.answers[question.id];
        if (!hasAnswer) {
          this.validationErrors[question.id] = true;
        }
        return !hasAnswer;
      })
    );

    return !hasValidationErrors && this.crossOverMessages.length === 0;
  }

  onBlur(questionId: string) {
    const question = this.currentPageData?.cards?.flatMap(card => card.questions)
      .find(q => q.id === questionId);

    if (question?.required) {
      this.validationErrors[questionId] = !this.answers[questionId];
    }
  }

  ngOnDestroy() {
    // Cleanup code if needed
  }
}
