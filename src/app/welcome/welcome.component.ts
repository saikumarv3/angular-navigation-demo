import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrefillService } from '../services/prefill.service';
import { MockService, Customer, Product } from '../services/mock.service';
import { NgFor, NgIf, CommonModule, DatePipe } from '@angular/common';
import { CrossOverValidationService } from '../services/cross-over-validation.service';
import { AlertBarComponent } from '../page/alert-bar/alert-bar.component';
import { STATE_OPTIONS, WELCOME_CONTENT } from '../page.data';
import { SvgService } from '../services/svg.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgFor, NgIf, AlertBarComponent, CommonModule, DatePipe],
  templateUrl: './welcome.component.html',
  providers: [CrossOverValidationService],
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  customer: Customer | null = null;
  products: Product[] = [];
  isLoading: boolean = true;
  answers: { [key: string]: string | string[] } = {};
  crossOverMessages: string[] = [];
  showAlert: boolean = false;
  welcomeIcon: SafeHtml = '';
  welcomeContent = WELCOME_CONTENT;
  
  constructor(
    private router: Router,
    private prefillService: PrefillService,
    private mockService: MockService,
    private crossOverValidationService: CrossOverValidationService,
    private svgService: SvgService
  ) {}

  ngOnInit() {
    // Get the raw SVG string from the service
    const rawSvg = this.svgService.getWelcomeIcon().toString();
    
    // Validate if it's a proper SVG
    if (this.svgService.isSvgString(rawSvg)) {
      this.welcomeIcon = this.svgService.getWelcomeIcon();
    } else {
      console.error('Invalid SVG string received');
      // You could set a default icon or handle the error here
    }
    
    this.mockService.getCustomerData().subscribe({
      next: (data) => {
        this.customer = data.customer;
        this.products = data.products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customer data:', error);
        this.isLoading = false;
      }
    });
  }

  startManualEntry() {
    this.prefillService.clearAnswers();
    this.router.navigate(['/page', 'product-selection']);
  }

  applySampleData(product: Product) {
    this.prefillService.clearAnswers();
    
    // Map state code to full state name
    const stateMap: { [key: string]: string } = {
      'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
      'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
      'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
      'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
      'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi',
      'MO': 'Missouri', 'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire',
      'NJ': 'New Jersey', 'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina',
      'ND': 'North Dakota', 'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania',
      'RI': 'Rhode Island', 'SC': 'South Carolina', 'SD': 'South Dakota', 'TN': 'Tennessee',
      'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont', 'VA': 'Virginia', 'WA': 'Washington',
      'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming', 'DC': 'District of Columbia',
      'PR': 'Puerto Rico', 'VI': 'U.S. Virgin Islands'
    };

    const fullStateName = stateMap[product.state] || product.state;
    
    const prefillData = {
      'product-selection': {
        'product-type': product.type,
        'purchase-state': fullStateName,
        'service-needed': product.prefillData.serviceNeeded || 'JCB', // Default to JCB if not specified
        'full-renewal': product.prefillData.fullRenewal,
        'adding-money': product.prefillData.addingMoney,
        'lan-check': product.prefillData.lanCheck,
        'safe-sell-check': product.prefillData.safeSellCheck
      }
    };

    Object.entries(prefillData).forEach(([pageId, pageAnswers]) => {
      Object.entries(pageAnswers).forEach(([questionId, answer]) => {
        this.prefillService.setAnswer(questionId, answer);
      });
    });

    this.checkCrossOverValidation();
  }

  private checkCrossOverValidation() {
    this.answers = this.prefillService.getAnswers();
    this.crossOverValidationService.checkCrossOverValidation(this.answers)
      .subscribe({
        next: (messages: string[]) => {
          this.crossOverMessages = messages;
          this.showAlert = messages.length > 0;
          
          if (messages.length === 0) {
            this.router.navigate(['/page', 'product-selection', 'prefill']);
          }
        },
        error: (error) => {
          console.error('Error checking cross-over validation:', error);
          this.crossOverMessages = ['An error occurred while validating your selections.'];
          this.showAlert = true;
        }
      });
  }
}
