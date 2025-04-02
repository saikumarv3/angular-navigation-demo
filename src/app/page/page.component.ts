import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PAGES, Page } from '../page.data';
import { PageContentComponent } from './page-content/page-content.component';
import { ErrorBarComponent } from './error-bar/error-bar.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [PageContentComponent, ErrorBarComponent],
  template: `
    <app-error-bar
      [show]="showBackError"
      [messages]="['Back navigation is not allowed']">
    </app-error-bar>
    <app-page-content
      [title]="title"
      [currentPageData]="currentPageData"
      [hasNext]="hasNext()"
      [isFormValid]="true"
      [answers]="answers"
      [touched]="touched"
      [showValidationErrors]="showValidationErrors"
      (next)="next()"
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      const pageIndex = PAGES.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        this.currentPage = pageIndex;
        this.currentPageData = PAGES[pageIndex];
        this.title = this.currentPageData.title;
      } else {
        this.title = 'Not Found';
        this.currentPageData = null;
      }
    });
  }

  hasNext() { 
    return this.currentPage < PAGES.length - 1; 
  }

  next() { 
    if (!this.isFormValid()) {
      this.showValidationErrors = true;
      return;
    }

    if (this.currentPage === PAGES.length - 1) {
      this.router.navigate(['/success']);
    } else {
      const nextPage = PAGES[this.currentPage + 1];
      this.router.navigate(['/page', nextPage.id]);
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

  onBlur(questionId: string) {
    this.touched[questionId] = true;
  }
}
