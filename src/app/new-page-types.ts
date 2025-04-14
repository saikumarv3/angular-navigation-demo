// Common types
export type QuestionType = 'text' | 'email' | 'tel' | 'date' | 'dropdown' | 'radio' | 'checkbox' | 'input' | 'submit';
export type LayoutType = 'full' | 'half' | 'third' | 'quarter';
export type WarningType = 'info' | 'warning' | 'error';
export type IconType = 'question-circle' | 'info-circle' | 'warning-circle' | 'error-circle';

// Validation types
export interface ValidationRule {
  type: 'required' | 'pattern' | 'minLength' | 'maxLength';
  message: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

// Visibility condition types
export interface VisibilityCondition {
  field: string;
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: string | number | boolean;
}

// Help tooltip types
export interface HelpTooltip {
  icon: IconType;
  tooltip: string;
  type: WarningType;
}

// Conditional warning types
export interface ConditionalWarning {
  condition: VisibilityCondition;
  message: string;
  type: WarningType;
}

// Warning types
export interface Warning {
  message: string;
  type: WarningType;
}

// Sub-heading types
export interface SubHeading {
  id: string;
  title: string;
  description: string;
  visibility?: {
    condition: VisibilityCondition;
  };
}

// Question types
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  layout: LayoutType;
  subHeadingId?: string;
  validation?: ValidationRule[];
  help?: HelpTooltip;
  conditionalWarning?: ConditionalWarning;
  visibility?: {
    condition: VisibilityCondition;
  };
}

export interface TextQuestion extends BaseQuestion {
  type: 'text';
  placeholder?: string;
  maxLength?: number;
}

export interface EmailQuestion extends BaseQuestion {
  type: 'email';
  placeholder?: string;
}

export interface TelQuestion extends BaseQuestion {
  type: 'tel';
  placeholder?: string;
}

export interface DateQuestion extends BaseQuestion {
  type: 'date';
}

export interface DropdownQuestion extends BaseQuestion {
  type: 'dropdown';
  options: string[];
  unsupportedMessage?: string;
}

export interface RadioQuestion extends BaseQuestion {
  type: 'radio';
  options: Array<{
    label: string;
    value: string;
  }>;
  conditionalQuestions?: {
    [key: string]: Question[] | { warning: Warning };
  };
}

export interface CheckboxQuestion extends BaseQuestion {
  type: 'checkbox';
  options: string[];
}

export interface InputQuestion extends BaseQuestion {
  type: 'input';
  placeholder?: string;
  maxLength?: number;
}

export interface SubmitQuestion extends BaseQuestion {
  type: 'submit';
}

export type Question = 
  | TextQuestion 
  | EmailQuestion 
  | TelQuestion 
  | DateQuestion 
  | DropdownQuestion 
  | RadioQuestion 
  | CheckboxQuestion 
  | InputQuestion 
  | SubmitQuestion;

// Card types
export interface Card {
  id: string;
  heading: string;
  description: string;
  component?: string;
  subHeadings?: SubHeading[];
  questions: Question[];
}

// Page types
export interface Page {
  id: string;
  page: string;
  title: string;
  cards: Card[];
}

// Form configuration types
export interface FormConfig {
  id: string;
  title: string;
  description: string;
}

// Application configuration types
export interface AppConfig {
  title: string;
  description: string;
  unsupportedStates?: string[];
}

// Main form builder schema type
export interface FormBuilderSchema {
  appConfig: AppConfig;
  formConfig: FormConfig;
  pages: Page[];
}

// Example usage:
/*
const carFormSchema: FormBuilderSchema = {
  appConfig: {
    title: "Car Advisor",
    description: "Find your perfect car",
    unsupportedStates: ["New York"]
  },
  formConfig: {
    id: "car-advisor-form",
    title: "Car Advisor Form",
    description: "Complete this form to get personalized car recommendations"
  },
  pages: [
    {
      id: "car-selection",
      page: "/select-car",
      title: "Select Your Car",
      cards: [
        {
          id: "car-type-selection",
          heading: "Car Type and Features",
          description: "Select your preferred car type and additional features",
          subHeadings: [
            {
              id: "location-info",
              title: "Location Information",
              description: "Your state of residence"
            }
          ],
          questions: [
            {
              id: "residence-state",
              type: "dropdown",
              label: "In which state do you reside?",
              required: true,
              layout: "full",
              options: ["California", "Texas", "Florida"],
              validation: [
                { type: "required", message: "Please select your state" }
              ]
            }
          ]
        }
      ]
    }
  ]
};
*/ 