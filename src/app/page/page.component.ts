import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PageContentComponent } from './page-content/page-content.component';
import { Page, ValidationRule } from '../new-page-types';
import { AlertBarComponent } from './alert-bar/alert-bar.component';
import { CrossOverValidationService } from '../services/cross-over-validation.service';
import { APP_CONFIG, VALIDATION_MESSAGES, VALIDATION_PATTERNS } from '../sample-new-page-types';
import { SUPPORTED_STATES } from '../constants/states';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [CommonModule, PageContentComponent, AlertBarComponent],
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  currentPageIndex = 0;
  currentPageData: Page = {
    id: 'car-selection',
    page: '/select-car',
    title: 'Select Your Car',
    cards: [
      {
        id: 'car-type-selection',
        heading: 'Car Type and Features',
        description: 'Select your preferred car type and additional features',
        questions: [
          {
            id: 'car-type',
            type: 'dropdown',
            label: 'Which type of car are you interested in?',
            required: true,
            layout: 'full',
            options: ['Sedan', 'SUV', 'Truck', 'Van', 'Sports Car'],
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.carType }
            ] as ValidationRule[]
          },
          {
            id: 'car-model',
            type: 'text',
            label: 'What model are you looking for?',
            required: true,
            layout: 'full',
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.carModel }
            ] as ValidationRule[]
          },
          {
            id: 'car-year',
            type: 'text',
            label: 'What year?',
            required: true,
            layout: 'full',
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.carYear },
              { type: 'pattern', message: VALIDATION_MESSAGES.pattern.year, pattern: VALIDATION_PATTERNS.year }
            ] as ValidationRule[]
          },
          {
            id: 'transmission',
            type: 'radio',
            label: 'Preferred transmission type?',
            required: true,
            layout: 'full',
            options: [
              { label: 'Automatic', value: 'automatic' },
              { label: 'Manual', value: 'manual' }
            ],
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.transmission }
            ] as ValidationRule[]
          },
          {
            id: 'fuel-type',
            type: 'radio',
            label: 'Preferred fuel type?',
            required: true,
            layout: 'full',
            options: [
              { label: 'Gasoline', value: 'gasoline' },
              { label: 'Diesel', value: 'diesel' },
              { label: 'Electric', value: 'electric' },
              { label: 'Hybrid', value: 'hybrid' }
            ],
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.fuelType }
            ] as ValidationRule[]
          }
        ]
      },
      {
        id: 'location-info',
        heading: 'Location Information',
        description: 'Please provide your location details',
        questions: [
          {
            id: 'state',
            type: 'dropdown',
            label: 'In which state do you reside?',
            required: true,
            layout: 'full',
            options: SUPPORTED_STATES,
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.state }
            ] as ValidationRule[]
          },
          {
            id: 'zip-code',
            type: 'text',
            label: 'ZIP Code',
            required: true,
            layout: 'full',
            validation: [
              { type: 'required', message: VALIDATION_MESSAGES.required.zipCode },
              { type: 'pattern', message: VALIDATION_MESSAGES.pattern.zipCode, pattern: VALIDATION_PATTERNS.zipCode }
            ] as ValidationRule[]
          }
        ]
      }
    ]
  };
  answers: { [key: string]: string | string[] } = {};
  isFormValid = true;
  validationErrors: { [key: string]: string | boolean } = {};
  showBackError = false;
  showLanError = false;
  isCheckingLan = false;
  crossOverMessages: string[] = [];
  hasAttemptedNext = false;
  PAGES = [this.currentPageData];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crossOverValidationService: CrossOverValidationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pageId = params['title'];
      const pageIndex = this.PAGES.findIndex((page: Page) => page.title === pageId);
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
          this.validationErrors[question.id] = VALIDATION_MESSAGES.required.default;
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
    if (confirm(APP_CONFIG.navigationButtons.exit.confirmMessage)) {
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
