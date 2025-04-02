export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'text' | 'checkbox';
  required?: boolean;
  options?: string[];
  errorMessage?: string;
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
    cards: [
      {
        id: 'renewal-details',
        title: 'Renewal details',
        questions: [
          {
            id: 'full-renewal',
            text: 'Is this a renewal of the full contract?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            errorMessage: 'Please select whether this is a full contract renewal'
          },
          {
            id: 'adding-money',
            text: 'Is the client adding any money when renewing?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            errorMessage: 'Please select whether the client is adding money'
          },
          {
            id: 'lan-check',
            text: 'Is LAN check failed?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            errorMessage: 'Please select whether LAN check has failed'
          },
          {
            id: 'safe-sell-check',
            text: 'Is safe sell check failed?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            errorMessage: 'Please select whether safe sell check has failed'
          }
        ]
      }
    ]
  },
  { id: 'advisor-terms', title: 'Advisor Terms' },
  { id: 'checkout', title: 'Checkout' },
  { id: 'address-info', title: 'Address Info' }
]; 