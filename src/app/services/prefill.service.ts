import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrefillService {
  private answers: { [key: string]: string } = {};

  getAnswers(): { [key: string]: string } {
    return { ...this.answers };
  }

  setAnswer(questionId: string, answer: string) {
    this.answers[questionId] = answer;
  }

  clearAnswers() {
    this.answers = {};
  }
} 