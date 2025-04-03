import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGES, Page } from './../page.data';
import { LanService } from '../services/lan.service';
import { PrefillService } from '../services/prefill.service';
import { PageContentComponent } from './page-content/page-content.component';
import { AlertBarComponent } from './alert-bar/alert-bar.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PageContentComponent, AlertBarComponent],
  template: `
    <app-alert-bar
      [show]="showBackError"
      [messages]="['Back navigation is not allowed']">
    </app-alert-bar>
    <app-alert-bar
      [show]="showLanError"
      [messages]="['LAN check failed. Please try again.']">
    </app-alert-bar>
    <app-page-content
      [title]="title"
      [currentPageData]="currentPageData"
      [hasNext]="hasNext"
      [isFormValid]="true"
      [answers]="answers"
      [touched]="touched"
      [showValidationErrors]="showValidationErrors"
      (next)="onNext()"
      (back)="onBack()"
      (onBlur)="onBlur($event)">
    </app-page-content>
  `
})
export class PageComponent implements OnInit {
  title = '';
  currentPage = 0;
  currentPageData: Page | null = null;
  answers: { [key: string]: string } = {};
  touched: { [key: string]: boolean } = {};
  showBackError = false;
  showValidationErrors = false;
  showLanError = false;
  isCheckingLan = false;
  isPrefillMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lanService: LanService,
    private prefillService: PrefillService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      this.isPrefillMode = this.router.url.includes('/prefill');
      this.currentPageData = PAGES.find(page => page.id === pageId) || null;
      
      if (this.currentPageData) {
        this.title = this.currentPageData.title;
        if (this.isPrefillMode) {
          this.answers = this.prefillService.getAnswers();
        }
      } else {
        this.title = 'Not Found';
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
    }
  }

  onBack() {
    this.showBackError = true;
    setTimeout(() => {
      this.showBackError = false;
    }, 3000);
  }

  isFormValid(): boolean {
    if (!this.currentPageData?.cards) return true;
    
    return this.currentPageData.cards.every(card => 
      card.questions.every(question => 
        !question.required || this.answers[question.id]
      )
    );
  }

  onBlur(fieldId: string) {
    this.touched[fieldId] = true;
    this.showValidationErrors = true;
  }
}
