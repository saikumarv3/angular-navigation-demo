// Question Types
export type QuestionType = 'radio' | 'text' | 'checkbox' | 'dropdown';

// Base Question Interface
export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
  required?: boolean;
  errorMessage?: string;
  options?: readonly string[] | [string, string]; // Make options optional in base interface
}

// Radio Question Interface
export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: [string, string]; // Exactly two options for radio buttons
}

// Text Question Interface
export interface TextQuestion extends BaseQuestion {
  type: 'text';
  options?: never; // Text questions should never have options
}

// Checkbox Question Interface
export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: string[];
}

// Dropdown Question Interface
export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  options: readonly string[];
}

// Union type for all possible questions
export type Question = RadioQuestion | TextQuestion | CheckboxQuestion | DropdownQuestion;

// Card Interface
export interface Card {
  id: string;
  title: string;
  questions: Question[];
}

// Page Interface
export interface Page {
  id: string;
  title: string;
  cards?: Card[];
}

// State Options
export const STATE_OPTIONS = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
  'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia', 
  'Puerto Rico', 'U.S. Virgin Islands'
] as const;

// Product Type Options
export const PRODUCT_TYPE_OPTIONS = ['Laptop', 'Phone', 'Home'] as const;

// Pages Configuration
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
            options: PRODUCT_TYPE_OPTIONS,
            errorMessage: 'Please select a product type'
          },
          {
            id: 'purchase-state',
            text: 'State of residence to buy',
            type: 'dropdown',
            required: true,
            options: STATE_OPTIONS,
            errorMessage: 'Please select a state'
          },
          {
            id: 'nickname',
            text: 'Enter a nickname for this product',
            type: 'text',
            required: true,
            errorMessage: 'Please enter a nickname for the product'
          },
          {
            id: 'full-renewal',
            text: 'Is this a renewal of the full contract?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'] as [string, string],
            errorMessage: 'Please select whether this is a full contract renewal'
          },
          {
            id: 'adding-money',
            text: 'Is the client adding any money when renewing?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No'] as [string, string],
            errorMessage: 'Please select whether the client is adding money'
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
            options: ['Yes', 'No'] as [string, string],
            errorMessage: 'Please select whether the advisor terms have been accepted'
          }
        ]
      }
    ]
  }
]; 