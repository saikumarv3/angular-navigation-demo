import { Injectable } from '@angular/core';
import { PREFILL_DATA, PREFILL_DATA_2 } from '../data/prefill.data';

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

  private initializeAnswersWithData2() {
    this.answers = {};
    Object.entries(PREFILL_DATA_2).forEach(([pageId, pageAnswers]) => {
      Object.entries(pageAnswers).forEach(([questionId, answer]) => {
        this.answers[questionId] = answer;
      });
    });
  }

  getAnswers(): { [key: string]: string } {
    return { ...this.answers };
  }

  setAnswer(questionId: string, answer: string) {
    this.answers[questionId] = answer;
  }

  clearAnswers() {
    this.answers = {};
  }

  useSampleData2() {
    this.initializeAnswersWithData2();
  }
} 