export const APP_CONFIG = {
    // Application Basic Information
    appName: 'Car Advisor Pro',
    appVersion: '1.0.0',
    appDescription: 'Your trusted car advisory platform',
    
    // Navigation Buttons Configuration
    navigationButtons: {
      exit: {
        label: 'Exit',
        icon: {
          src: '/assets/images/navigation/exit.png',
          alt: 'Exit Icon'
        },
        action: 'exit',
        confirmMessage: 'Are you sure you want to exit? Your progress will be lost.'
      },
      next: {
        label: 'Next',
        icon: {
          src: '/assets/images/navigation/next.png',
          alt: 'Next Icon'
        },
        action: 'next',
        validateBeforeProceed: true
      },
      back: {
        label: 'Back',
        icon: {
          src: '/assets/images/navigation/back.png',
          alt: 'Back Icon'
        },
        action: 'back',
        saveProgress: true
      }
    },
    
    // Header Configuration
    header: {
      logo: {
        src: '/assets/images/logo.png',
        alt: 'Car Advisor Pro Logo'
      }
    },
  
    // Footer Configuration
    footer: {
      links: [
        {
          section: 'Company',
          items: [
            { label: 'About Us', path: '/about' },
            { label: 'Careers', path: '/careers' },
            { label: 'Press', path: '/press' },
            { label: 'Blog', path: '/blog' }
          ]
        },
        {
          section: 'Support',
          items: [
            { label: 'Help Center', path: '/help' },
            { label: 'Contact Us', path: '/contact' },
            { label: 'FAQs', path: '/faq' },
            { label: 'Feedback', path: '/feedback' }
          ]
        },
        {
          section: 'Legal',
          items: [
            { label: 'Privacy Policy', path: '/privacy' },
            { label: 'Terms of Service', path: '/terms' },
            { label: 'Cookie Policy', path: '/cookies' },
            { label: 'Accessibility', path: '/accessibility' }
          ]
        },
        {
          section: 'Social',
          items: [
            { 
              label: 'Facebook', 
              path: 'https://facebook.com/caradvisorpro',
              icon: {
                src: '/assets/images/social/facebook.png',
                alt: 'Facebook Icon'
              }
            },
            { 
              label: 'Twitter', 
              path: 'https://twitter.com/caradvisorpro',
              icon: {
                src: '/assets/images/social/twitter.png',
                alt: 'Twitter Icon'
              }
            },
            { 
              label: 'LinkedIn', 
              path: 'https://linkedin.com/company/caradvisorpro'
            },
            { 
              label: 'Instagram', 
              path: 'https://instagram.com/caradvisorpro'
            }
          ]
        }
      ],
      copyright: '© 2024 Car Advisor Pro. All rights reserved.'
    },
  
    // Contact Information
    contact: {
      support: {
        phone: '+1 (800) 123-4567',
        email: 'support@caradvisorpro.com',
        hours: '24/7'
      },
      sales: {
        phone: '+1 (800) 987-6543',
        email: 'sales@caradvisorpro.com',
        hours: 'Mon-Fri: 9AM-6PM EST'
      },
      emergency: {
        phone: '+1 (800) 555-1234',
        available: '24/7'
      }
    },
  
    // Application Settings
    settings: {
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'es', 'fr'],
      timezone: 'America/Detroit',
      dateFormat: 'MM/DD/YYYY',
      currency: 'USD',
      maxFileUploadSize: '10MB',
      sessionTimeout: 30 // minutes
    },
  
    // Feature Flags
    features: {
      enableChatSupport: true,
      enableVideoConsultation: false,
      enableMultiLanguage: true,
      enableDarkMode: true,
      enableNotifications: true
    }
  }; 
// Validation messages
export const VALIDATION_MESSAGES = {
    required: {
      default: 'This field is required',
      email: 'Email address is required',
      phone: 'Phone number is required',
      address: 'Address is required',
      state: 'State is required',
      zipCode: 'ZIP code is required',
      carType: 'Please select a car type',
      carModel: 'Car model is required',
      carYear: 'Year is required',
      transmission: 'Transmission type is required',
      fuelType: 'Fuel type is required'
    },
    pattern: {
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      zipCode: 'Please enter a valid ZIP code',
      year: 'Please enter a valid year',
      mileage: 'Please enter a valid number'
    }
  };
  
  // Validation patterns
  export const VALIDATION_PATTERNS = {
    email: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
    phone: '^\\d{10}$',
    zipCode: '^\\d{5}$',
    year: '^\\d{4}$',
    mileage: '^\\d+$'
  };
  
// Car-specific validation rules
export const CAR_VALIDATION_RULES = {
    carType: [
      { type: 'required', message: VALIDATION_MESSAGES.required.carType }
    ],
    carModel: [
      { type: 'required', message: VALIDATION_MESSAGES.required.carModel }
    ],
    carYear: [
      { type: 'required', message: VALIDATION_MESSAGES.required.carYear },
      { type: 'pattern', message: VALIDATION_MESSAGES.pattern.year, pattern: VALIDATION_PATTERNS.year }
    ],
    transmission: [
      { type: 'required', message: VALIDATION_MESSAGES.required.transmission }
    ],
    fuelType: [
      { type: 'required', message: VALIDATION_MESSAGES.required.fuelType }
    ],
    mileage: [
      { type: 'pattern', message: VALIDATION_MESSAGES.pattern.mileage, pattern: VALIDATION_PATTERNS.mileage }
    ]
  };
  
  // Contact information validation rules
  export const CONTACT_VALIDATION_RULES = {
    email: [
      { type: 'required', message: VALIDATION_MESSAGES.required.email },
      { type: 'pattern', message: VALIDATION_MESSAGES.pattern.email, pattern: VALIDATION_PATTERNS.email }
    ],
    phone: [
      { type: 'required', message: VALIDATION_MESSAGES.required.phone },
      { type: 'pattern', message: VALIDATION_MESSAGES.pattern.phone, pattern: VALIDATION_PATTERNS.phone }
    ],
    address: [
      { type: 'required', message: VALIDATION_MESSAGES.required.address }
    ],
    state: [
      { type: 'required', message: VALIDATION_MESSAGES.required.state }
    ],
    zipCode: [
      { type: 'required', message: VALIDATION_MESSAGES.required.zipCode },
      { type: 'pattern', message: VALIDATION_MESSAGES.pattern.zipCode, pattern: VALIDATION_PATTERNS.zipCode }
    ]
  }; 


  
// Common options for Yes/No questions
const YES_NO_OPTIONS = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' }
  ];
  
  // List of all US states
  const ALL_US_STATES = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];
  
  // States where we don't operate
  const UNSUPPORTED_STATES = ['New York'];
  
  // Get supported states by excluding unsupported ones
  const SUPPORTED_STATES = ALL_US_STATES.filter(state => !UNSUPPORTED_STATES.includes(state));
  
  // Car-specific form builder schema
  export const CAR_FORM_BUILDER_SCHEMA = {
    // Application Configuration
    appConfig: {
      ...APP_CONFIG,
      // Add unsupported states to app config
      unsupportedStates: UNSUPPORTED_STATES
    },
  
    // Form Configuration
    formConfig: {
      id: 'car-advisor-form',
      title: 'Car Advisor Form',
      description: 'Complete this form to get personalized car recommendations'
    },
  
    // Form Pages
    pages: [
      {
        id: 'car-selection',
        page: '/select-car',
        title: 'Select Your Car',
        cards: [
          {
            id: 'user-details',
            heading: 'Personal Information',
            description: 'Please provide your personal details',
            component: 'UserDetailsComponent',
            questions: [
              {
                id: 'first-name',
                type: 'text',
                label: 'First Name',
                required: true,
                layout: 'third',
                validation: [
                  { type: 'required', message: 'First name is required' },
                  { type: 'pattern', message: 'Please enter a valid first name', pattern: '^[A-Za-z\\s-]+$' }
                ]
              },
              {
                id: 'middle-name',
                type: 'text',
                label: 'Middle Name',
                required: false,
                layout: 'third',
                validation: [
                  { type: 'pattern', message: 'Please enter a valid middle name', pattern: '^[A-Za-z\\s-]+$' }
                ]
              },
              {
                id: 'last-name',
                type: 'text',
                label: 'Last Name',
                required: true,
                layout: 'third',
                validation: [
                  { type: 'required', message: 'Last name is required' },
                  { type: 'pattern', message: 'Please enter a valid last name', pattern: '^[A-Za-z\\s-]+$' }
                ]
              },
              {
                id: 'email',
                type: 'email',
                label: 'Email Address',
                required: true,
                layout: 'half',
                validation: CONTACT_VALIDATION_RULES.email
              },
              {
                id: 'phone',
                type: 'tel',
                label: 'Phone Number',
                required: true,
                layout: 'half',
                validation: CONTACT_VALIDATION_RULES.phone
              },
              {
                id: 'date-of-birth',
                type: 'date',
                label: 'Date of Birth',
                required: false,
                layout: 'full',
                validation: [
                  { type: 'pattern', message: 'Please enter a valid date', pattern: '^\\d{4}-\\d{2}-\\d{2}$' }
                ],
                visibility: {
                  condition: {
                    field: 'residence-state',
                    operator: 'equals',
                    value: 'Florida'
                  }
                }
              }
            ]
          },
          {
            id: 'car-type-selection',
            heading: 'Car Type and Features',
            description: 'Select your preferred car type and additional features',
            subHeadings: [
              {
                id: 'location-info',
                title: 'Location Information',
                description: 'Your state of residence'
              },
              {
                id: 'car-basic-info',
                title: 'Basic Car Information',
                description: 'Core car details'
              },
              {
                id: 'car-features',
                title: 'Additional Features',
                description: 'Optional features and upgrades'
              }
            ],
            questions: [
              {
                subHeadingId: 'location-info',
                id: 'residence-state',
                type: 'dropdown',
                label: 'In which state do you reside?',
                required: true,
                layout: 'full',
                options: SUPPORTED_STATES,
                validation: [
                  { type: 'required', message: 'Please select your state of residence' }
                ],
                unsupportedMessage: 'We currently do not operate in the following states: ' + UNSUPPORTED_STATES.join(', ')
              },
              {
                subHeadingId: 'car-basic-info',
                id: 'car-type',
                type: 'dropdown',
                label: 'What type of car are you interested in?',
                required: true,
                layout: 'full',
                options: ['Basic', 'Premium', 'Sports', 'Luxury', 'SUV', 'Electric'],
                validation: CAR_VALIDATION_RULES.carType,
                help: {
                  icon: 'question-circle',
                  tooltip: 'Note: You cannot change the car type after this page. Please make your selection carefully.',
                  type: 'warning'
                }
              },
              {
                subHeadingId: 'car-features',
                id: 'car-features',
                type: 'checkbox',
                label: 'Select additional features',
                required: false,
                layout: 'full',
                options: [
                  'Sunroof',
                  'Leather Seats',
                  'Navigation System',
                  'Bluetooth',
                  'Parking Sensors',
                  'Backup Camera',
                  'Heated Seats',
                  'Premium Sound System'
                ],
                conditionalWarning: {
                  condition: {
                    field: 'car-type',
                    operator: 'equals',
                    value: 'Electric'
                  },
                  message: 'For electric vehicles, some features may not be available at checkout due to manufacturer specifications.',
                  type: 'info'
                }
              }
            ]
          },
          {
            id: 'car-specifications',
            heading: 'Car Specifications',
            description: 'Provide details about your preferred car specifications',
            subHeadings: [
              {
                id: 'basic-specs',
                title: 'Basic Specifications',
                description: 'Core vehicle specifications'
              },
              {
                id: 'technical-specs',
                title: 'Technical Specifications',
                description: 'Vehicle technical details'
              }
            ],
            questions: [
              {
                subHeadingId: 'basic-specs',
                id: 'car-model',
                type: 'input',
                label: 'Car Model',
                required: true,
                layout: 'half',
                placeholder: 'Enter car model',
                maxLength: 50,
                validation: CAR_VALIDATION_RULES.carModel
              },
              {
                subHeadingId: 'basic-specs',
                id: 'car-year',
                type: 'input',
                label: 'Manufacturing Year',
                required: true,
                layout: 'half',
                placeholder: 'Enter year (e.g., 2023)',
                maxLength: 4,
                validation: CAR_VALIDATION_RULES.carYear
              },
              {
                subHeadingId: 'basic-specs',
                id: 'car-color',
                type: 'input',
                label: 'Color',
                required: false,
                layout: 'quarter',
                placeholder: 'Enter color'
              },
              {
                subHeadingId: 'technical-specs',
                id: 'car-transmission',
                type: 'dropdown',
                label: 'Transmission',
                required: true,
                layout: 'quarter',
                options: ['Automatic', 'Manual', 'Semi-Automatic'],
                validation: CAR_VALIDATION_RULES.transmission
              },
              {
                subHeadingId: 'technical-specs',
                id: 'car-fuel',
                type: 'dropdown',
                label: 'Fuel Type',
                required: true,
                layout: 'quarter',
                options: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
                validation: CAR_VALIDATION_RULES.fuelType
              },
              {
                subHeadingId: 'technical-specs',
                id: 'car-mileage',
                type: 'input',
                label: 'Expected Mileage',
                required: false,
                layout: 'quarter',
                placeholder: 'Enter mileage',
                validation: CAR_VALIDATION_RULES.mileage
              }
            ]
          },
          {
            id: 'insurance-details',
            heading: 'Insurance Information',
            description: 'Select your insurance preferences',
            subHeadings: [
              {
                id: 'insurance-basic',
                title: 'Basic Insurance',
                description: 'Standard insurance options'
              },
              {
                id: 'insurance-advanced',
                title: 'Advanced Options',
                description: 'Additional coverage and details',
                visibility: {
                  condition: {
                    field: 'take-insurance',
                    operator: 'equals',
                    value: 'yes'
                  }
                }
              }
            ],
            questions: [
              {
                subHeadingId: 'insurance-basic',
                id: 'take-insurance',
                type: 'radio',
                label: 'Would you like to take insurance with us?',
                required: true,
                layout: 'full',
                options: YES_NO_OPTIONS,
                validation: [
                  { type: 'required', message: 'Please select an insurance option' }
                ],
                conditionalQuestions: {
                  yes: [
                    {
                      subHeadingId: 'insurance-advanced',
                      id: 'current-insurance',
                      type: 'radio',
                      label: 'Do you have current insurance?',
                      required: true,
                      layout: 'full',
                      options: YES_NO_OPTIONS,
                      validation: [
                        { type: 'required', message: 'Please indicate if you have current insurance' }
                      ]
                    },
                    {
                      subHeadingId: 'insurance-advanced',
                      id: 'high-speed-driving',
                      type: 'radio',
                      label: 'Do you drive more than 90km per hour?',
                      required: true,
                      layout: 'full',
                      options: YES_NO_OPTIONS,
                      validation: [
                        { type: 'required', message: 'Please indicate your typical driving speed' }
                      ],
                      help: {
                        icon: 'info-circle',
                        tooltip: 'This information helps us provide accurate insurance rates based on your driving habits.',
                        type: 'info'
                      }
                    }
                  ],
                  no: {
                    warning: {
                      message: 'Please consider taking insurance with us. We offer a 30% discount on our comprehensive coverage plans.',
                      type: 'info'
                    }
                  }
                }
              }
            ]
          },
          {
            id: 'additional-requirements',
            heading: 'Additional Requirements',
            description: 'Any specific requirements or preferences for your car',
            questions: [
              {
                id: 'ny-downtown',
                type: 'radio',
                label: 'Do you live in downtown New York?',
                required: false,
                layout: 'full',
                options: YES_NO_OPTIONS,
                visibility: {
                  condition: {
                    field: 'residence-state',
                    operator: 'equals',
                    value: 'New York'
                  }
                }
              },
              {
                id: 'car-description',
                type: 'input',
                label: 'Additional Requirements',
                required: false,
                layout: 'full',
                placeholder: 'Enter any specific requirements or preferences',
                maxLength: 500
              }
            ]
          }
        ]
      },
      {
        id: 'advisor-terms',
        page: '/advisor-terms',
        title: 'Advisor Terms and Conditions',
        cards: [
          {
            id: 'terms-card',
            heading: 'Please review and accept the following terms',
            questions: [
              {
                id: 'terms-acceptance',
                type: 'checkbox',
                label: 'I have read and agree to the Car Advisor Terms and Conditions',
                required: true,
                validation: [
                  { type: 'required', message: 'You must accept the terms to proceed' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'address-info',
        page: '/address-info',
        title: 'Contact Information',
        cards: [
          {
            id: 'contact-details',
            heading: 'Please provide your contact information',
            questions: [
              {
                id: 'email',
                type: 'text',
                label: 'Email Address',
                required: true,
                prefillKey: 'userEmail',
                validation: CONTACT_VALIDATION_RULES.email
              },
              {
                id: 'phone',
                type: 'text',
                label: 'Phone Number',
                required: true,
                prefillKey: 'userPhone',
                validation: CONTACT_VALIDATION_RULES.phone
              },
              {
                id: 'address',
                type: 'text',
                label: 'Street Address',
                required: true,
                prefillKey: 'userAddress',
                validation: CONTACT_VALIDATION_RULES.address
              },
              {
                id: 'state',
                type: 'dropdown',
                label: 'State',
                required: true,
                prefillKey: 'userState',
                options: ALL_US_STATES,
                validation: CONTACT_VALIDATION_RULES.state
              },
              {
                id: 'zip-code',
                type: 'text',
                label: 'ZIP Code',
                required: true,
                prefillKey: 'userZipCode',
                validation: CONTACT_VALIDATION_RULES.zipCode
              }
            ]
          }
        ]
      },
      {
        id: 'checkout-gateway',
        page: '/checkout',
        title: 'Final Steps',
        cards: [
          {
            id: 'policy-acknowledgments',
            heading: 'Please review and acknowledge the following policies',
            questions: [
              {
                id: 'privacy-policy',
                type: 'checkbox',
                label: 'I acknowledge the Privacy Policy',
                required: false
              },
              {
                id: 'data-usage',
                type: 'checkbox',
                label: 'I consent to the use of my data for service improvement',
                required: false
              },
              {
                id: 'marketing-consent',
                type: 'checkbox',
                label: 'I agree to receive marketing communications',
                required: false
              }
            ]
          },
          {
            id: 'submit-section',
            questions: [
              {
                id: 'submit-button',
                type: 'submit',
                label: 'Complete Purchase',
                required: true
              }
            ]
          }
        ]
      }
    ]
  }; 