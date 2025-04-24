// Question Types
export type QuestionType = 'text' | 'radio' | 'checkbox' | 'dropdown' | 'heading' | 'submit' | 'input';
export type LayoutType = "full" | "half";

// Validation Rules
export interface ValidationRule {
  type: 'required' | 'pattern' | 'minLength' | 'maxLength' | 'custom';
  message: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  customValidator?: string;
}

// Visibility Conditions
export interface VisibilityCondition {
  questionId: string;
  expectedValue: any;
  operator?: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan';
}

interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: string;
  required?: boolean;
  errorMessage?: string;
  layout?: 'full' | 'half';
  visibilityConditions?: VisibilityCondition[];  // Array of visibility conditions
  validation?: ValidationRule[];
}

// Question Interface
export interface Question extends BaseQuestion {
  subheading?: string;     // Optional subheading for the question
  options?: readonly string[];    // Available options for dropdown/radio/checkbox
  prefillKey?: string;     // Key to use for pre-filling the question
  defaultValue?: any;      // Default value for the question
  layout?: LayoutType;     // How much space the question takes
  placeholder?: string;    // Hint text inside the input
  maxLength?: number;      // Maximum number of characters allowed
}

// Card Interface
export interface Card {
  id: string;
  headingOfCard: string;  // Renamed from title
  questions: Question[];
  visibilityConditions?: VisibilityCondition[];  // Array of visibility conditions for the card
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
        headingOfCard: 'Renewal details',
        questions: [
          {
            id: 'product-type',
            type: 'dropdown',
            label: 'Which product would you like to purchase?',
            required: true,
            options: PRODUCT_TYPE_OPTIONS,
            layout: 'full',
            validation: [
              {
                type: 'required',
                message: 'Please select a product type'
              }
            ]
          },
          {
            id: 'purchase-state',
            type: 'dropdown',
            label: 'State of residence to buy',
            required: true,
            options: STATE_OPTIONS,
            layout: 'full',
            validation: [
              {
                type: 'required',
                message: 'Please select a state'
              }
            ]
          },
          
        ]
      },
      {
        id: 'additional-questions',
        headingOfCard: 'Additional Questions',
        questions: [
          {
            id: 'is-student',
            type: 'radio',
            label: 'Are you a student?',
            required: true,
            layout: 'half',
            options: ['Yes', 'No'],
            visibilityConditions: [
              {
                questionId: 'product-type',
                expectedValue: 'Laptop',
                operator: 'equals'
              },
              {
                questionId: 'full-renewal',
                expectedValue: 'Yes',
                operator: 'equals'
              },
              {
                questionId: 'purchase-state',
                expectedValue: 'Alabama',
                operator: 'equals'
              }
            ]
          },
         
          {
            id: 'nickname',
            type: 'text',
            subheading: 'NickName of Prod',
            label: 'Enter a nickname for this product',
            required: true,
            layout: 'full',
            placeholder: 'Enter a nickname',
            maxLength: 50,
            validation: [
              {
                type: 'required',
                message: 'Please enter a nickname for the product'
              },
              {
                type: 'maxLength',
                message: 'Nickname must be less than 50 characters',
                maxLength: 50
              }
            ]
          },
          {
            id: 'full-renewal',
            type: 'radio',
            label: 'Is this a renewal of the full contract?',
            required: true,
            options: ['Yes', 'No'],
            layout: 'full',
            validation: [
              {
                type: 'required',
                message: 'Please select whether this is a full contract renewal'
              }
            ]
          },
          {
            id: 'adding-money',
            type: 'radio',
            label: 'Is the client adding any money when renewing?',
            required: true,
            options: ['Yes', 'No'],
            layout: 'full',
            validation: [
              {
                type: 'required',
                message: 'Please select whether the client is adding money'
              }
            ]
          }
        ]
        
      },
      {
        id: 'college-student',
        headingOfCard: 'college student?',
        visibilityConditions: [
          {
            questionId: 'is-student',
            expectedValue: 'Yes',
            operator: 'equals'
          }
        ],
        questions: [
          {
            id: 'is-stunt',
            type: 'radio',
            label: 'Aare you are standford college student?',
            required: true,
            layout: 'half',
            options: ['Yes', 'No']
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
        headingOfCard: 'Advisor Terms',
        questions: [
          {
            id: 'advisor-terms',
            type: 'radio',
            label: 'Advisor Terms',
            required: true,
            options: ['Yes', 'No'],
            layout: 'full',
            validation: [
              {
                type: 'required',
                message: 'Please select whether the advisor terms have been accepted'
              }
            ]
          }
        ]
      }
    ]
  }
]; 