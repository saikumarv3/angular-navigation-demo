import { Injectable } from '@angular/core';
import { Page } from '../new-page-types';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrefillService {
  private answers: { [key: string]: string } = {
    'car-type': 'SUV',
    'car-model': 'Toyota RAV4',
    'car-year': '2023',
    'transmission': 'automatic',
    'fuel-type': 'hybrid',
    'state': 'CA',
    'zip-code': '90210'
  };

  constructor() {}

  getPrefillData(filename: string) {
    // Return the prefill answers
    return of(this.answers);
  }

  getAnswers(): { [key: string]: string } {
    return { ...this.answers };
  }

  clearAnswers(): void {
    this.answers = {};
  }
} 