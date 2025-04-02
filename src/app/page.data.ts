export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'text' | 'checkbox';
  options?: string[];
  required: boolean;
  errorMessage: string;
}

export interface Card {
  id: string;
  title: string;
  questions: Question[];
}

export interface Page {
  id: string;
  title: string;
  cards?: Card[];
}

export const PAGES: Page[] = [
  { 
    id: 'product-selection', 
    title: 'Product Selection',
    cards: [{
      id: 'renewal-details',
      title: 'Renewal details',
      questions: [
        {
          id: 'renewal-full-contract',
          text: 'Is this a renewal of the full contract?',
          type: 'radio',
          options: ['Yes', 'No'],
          required: true,
          errorMessage: 'Make a selection'
        },
        {
          id: 'adding-new-money',
          text: 'Is the client adding any money when renewing?',
          type: 'radio',
          options: ['Yes', 'No'],
          required: true,
          errorMessage: 'Make a selection'
        }
      ]
    }]
  },
  { id: 'advisor-terms', title: 'Advisor Terms' },
  { id: 'checkout', title: 'Checkout' },
  { id: 'address-info', title: 'Address Info' }
]; 