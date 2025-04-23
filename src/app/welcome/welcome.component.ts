import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrefillService } from '../services/prefill.service';
import { MockService, Customer, Product } from '../services/mock.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  customer: Customer | null = null;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private prefillService: PrefillService,
    private mockService: MockService
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

    // Navigate to the product selection page
    this.router.navigate(['/page', 'product-selection', 'prefill']);
  }
}
