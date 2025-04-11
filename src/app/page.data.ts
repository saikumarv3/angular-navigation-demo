export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'text' | 'checkbox' | 'dropdown';
  required?: boolean;
  options?: string[];
  errorMessage?: string;
  answer?: string | string[];
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
                id: 'product-type',
                text: 'Which product would you like to purchase?',
                type: 'dropdown',
                required: true,
                options: ['Laptop', 'Phone', 'Home']
              },
              {
                id: 'purchase-state',
                text: 'State of residence to buy',
                type: 'dropdown',
                required: true,
                options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico', 'U.S. Virgin Islands']
              },
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
  { 
    id: 'advisor-terms',
    title: 'Advisor Terms',
    cards: [
      {
        id: 'advisor-terms',
        title: 'Advisor Terms',
        questions: [
          {
            id: 'advisor-terms',
            text: 'Advisor Terms',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'],
            errorMessage: 'Please select whether the advisor terms have been accepted'
          }
        ]
      }
    ]
  },
  { id: 'checkout', title: 'Checkout' },
  { id: 'address-info', title: 'Address Info' }
]; 