import { Page, Card, Question } from './new-page-types';

export const PAGES: Page[] = [
  {
    id: 'product-selection',
    page: '/product-selection',
    title: 'Product Selection',
    cards: [
      {
        id: 'renewal-details',
        heading: 'Renewal details',
        description: 'Please provide your renewal details',
        questions: [
          {
            id: 'product-type',
            type: 'dropdown',
            label: 'Which product would you like to purchase?',
            required: true,
            layout: 'full',
            options: ['Laptop', 'Phone', 'Home'],
            validation: [
              { type: 'required', message: 'Please select a product type' }
            ]
          },
          {
            id: 'purchase-state',
            type: 'dropdown',
            label: 'State of residence to buy',
            required: true,
            layout: 'full',
            options: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico', 'U.S. Virgin Islands'],
            validation: [
              { type: 'required', message: 'Please select your state' }
            ]
          },
          {
            id: 'full-renewal',
            type: 'radio',
            label: 'Is this a renewal of the full contract?',
            required: true,
            layout: 'full',
            options: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ],
            validation: [
              { type: 'required', message: 'Please select whether this is a full contract renewal' }
            ]
          },
          {
            id: 'adding-money',
            type: 'radio',
            label: 'Is the client adding any money when renewing?',
            required: true,
            layout: 'full',
            options: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ],
            validation: [
              { type: 'required', message: 'Please select whether the client is adding money' }
            ]
          },
          {
            id: 'lan-check',
            type: 'radio',
            label: 'Is LAN check failed?',
            required: true,
            layout: 'full',
            options: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ],
            validation: [
              { type: 'required', message: 'Please select whether LAN check has failed' }
            ]
          },
          {
            id: 'safe-sell-check',
            type: 'radio',
            label: 'Is safe sell check failed?',
            required: true,
            layout: 'full',
            options: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ],
            validation: [
              { type: 'required', message: 'Please select whether safe sell check has failed' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'advisor-terms',
    page: '/advisor-terms',
    title: 'Advisor Terms',
    cards: [
      {
        id: 'advisor-terms',
        heading: 'Advisor Terms',
        description: 'Please review and accept the advisor terms',
        questions: [
          {
            id: 'advisor-terms',
            type: 'radio',
            label: 'Advisor Terms',
            required: true,
            layout: 'full',
            options: [
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' }
            ],
            validation: [
              { type: 'required', message: 'Please select whether the advisor terms have been accepted' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'checkout',
    page: '/checkout',
    title: 'Checkout',
    cards: []
  },
  {
    id: 'address-info',
    page: '/address-info',
    title: 'Address Information',
    cards: []
  }
]; 