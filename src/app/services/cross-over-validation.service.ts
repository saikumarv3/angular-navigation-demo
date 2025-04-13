import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CrossOverRule {
  id: string;
  conditions: {
    questionId: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'notContains';
    value: string | string[];
  }[];
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrossOverValidationService {
  private crossOverRules: CrossOverRule[] = [
    {
      id: 'laptop-no-renewal',
      conditions: [
        { questionId: 'product-type', operator: 'equals', value: 'Laptop' },
        { questionId: 'full-renewal', operator: 'equals', value: 'No' }
      ],
      message: 'Laptop products require full renewal. Please select Yes for full renewal.'
    }
    // Add more rules as needed
  ];

  constructor() {}

  // For now, return the hardcoded rules
  // In the future, this can be updated to fetch rules from Tridion
  getCrossOverRules(): Observable<CrossOverRule[]> {
    return of(this.crossOverRules);
  }

  checkCrossOverValidation(answers: { [key: string]: string | string[] }): Observable<string[]> {
    return this.getCrossOverRules().pipe(
      map(rules => {
        const messages: string[] = [];
        
        rules.forEach(rule => {
          const isRuleValid = rule.conditions.every(condition => {
            const answer = answers[condition.questionId];
            if (!answer) return false;

            switch (condition.operator) {
              case 'equals':
                return answer === condition.value;
              case 'notEquals':
                return answer !== condition.value;
              case 'contains':
                return Array.isArray(answer) ? answer.includes(condition.value as string) : false;
              case 'notContains':
                return Array.isArray(answer) ? !answer.includes(condition.value as string) : true;
              default:
                return false;
            }
          });

          if (isRuleValid) {
            messages.push(rule.message);
          }
        });

        return messages;
      })
    );
  }
} 