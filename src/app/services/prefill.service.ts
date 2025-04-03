import { Injectable } from '@angular/core';
import { PREFILL_DATA } from '../data/prefill.data';

@Injectable({
  providedIn: 'root'
})
export class PrefillService {
  private answers: { [key: string]: string } = {};

  constructor() {
    // Initialize answers from prefill data
    this.initializeAnswers();
  }

  private initializeAnswers() {
    // Flatten the nested prefill data into a single answers object
    Object.entries(PREFILL_DATA).forEach(([pageId, pageAnswers]) => {
      Object.entries(pageAnswers).forEach(([questionId, answer]) => {
        this.answers[questionId] = answer;
      });
    });
  }

  getAnswers(): { [key: string]: string } {
    return { ...this.answers };
  }

  clearAnswers() {
    this.answers = {};
  }
} 