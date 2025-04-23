import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrefillService } from '../services/prefill.service';
import { MockService, Customer, Product } from '../services/mock.service';
import { NgFor, NgIf } from '@angular/common';
import { CrossOverValidationService } from '../services/cross-over-validation.service';
import { AlertBarComponent } from '../page/alert-bar/alert-bar.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgFor, NgIf, AlertBarComponent],
  templateUrl: './welcome.component.html',
  providers: [CrossOverValidationService],
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  customer: Customer | null = null;
  isLoading: boolean = true;
  answers: { [key: string]: string | string[] } = {};
  crossOverMessages: string[] = [];
  showAlert: boolean = false;

  constructor(
    private router: Router,
    private prefillService: PrefillService,
    private mockService: MockService,
    private crossOverValidationService: CrossOverValidationService
  ) {}

  ngOnInit() {
    this.loadCustomerData();
  }

  loadCustomerData() {
    this.isLoading = true;
    this.mockService.getCustomerData().subscribe({
      next: (data) => {
        this.customer = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customer data:', error);
        this.isLoading = false;
      }
    });
  }

  startWizard() {
    this.prefillService.clearAnswers();
    this.router.navigate(['/page', 'product-selection']);
  }

  applySampleData(product: Product) {
    // Clear any existing answers
    this.prefillService.clearAnswers();
    
    // Set up the prefill data based on the selected product
    const prefillData = {
      'product-selection': {
        'product-type': product.type,
        'purchase-state': product.state,
        'full-renewal': 'No',
        'adding-money': 'No',
        'lan-check': 'No',
        'safe-sell-check': 'No'
      },
      'customer-details': {
        'customer-name': this.customer?.name || '',
        'customer-email': this.customer?.email || '',
        'customer-phone': this.customer?.phone || ''
      },
      'technical-questions': {
        'os-type': product.type.toLowerCase().includes('laptop') ? 'windows' : 
                  product.type.toLowerCase().includes('phone') ? 'ios' : 'other',
        'os-version': product.type.toLowerCase().includes('laptop') ? 'Windows 11' : 
                     product.type.toLowerCase().includes('phone') ? 'iOS 16' : 'N/A',
        'ram-size': product.type.toLowerCase().includes('laptop') ? '16GB' : 
                   product.type.toLowerCase().includes('phone') ? '8GB' : 'N/A',
        'storage-type': 'SSD',
        'storage-size': product.type.toLowerCase().includes('laptop') ? '512GB' : 
                       product.type.toLowerCase().includes('phone') ? '256GB' : 'N/A'
      }
    };

    // Set the prefill data
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
          console.log('Cross-over messages:', this.crossOverMessages);
          
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
