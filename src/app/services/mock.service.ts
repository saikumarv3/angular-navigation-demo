import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export interface Product {
  id: number;
  type: string;
  state: string;
  status: string;
  lastRenewalDate: string;
  nextRenewalDate: string;
  description: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  products: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private mockData: Customer = {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 234-567-8900',
    products: [
      {
        id: 1,
        type: 'Laptop',
        state: 'California',
        status: 'Active',
        lastRenewalDate: '2023-01-15',
        nextRenewalDate: '2024-01-15',
        description: 'Dell XPS 15, Windows 11, 16GB RAM, 512GB SSD'
      },
      {
        id: 2,
        type: 'Phone',
        state: 'New York',
        status: 'Active',
        lastRenewalDate: '2023-03-20',
        nextRenewalDate: '2024-03-20',
        description: 'iPhone 14 Pro, iOS 16, 256GB storage'
      },
      {
        id: 3,
        type: 'Home',
        state: 'California',
        status: 'Pending',
        lastRenewalDate: '2023-06-10',
        nextRenewalDate: '2024-06-10',
        description: 'Home security system with cameras and smart locks'
      }
    ]
  };

  getCustomerData() {
    // Simulate API call with delay
    return of(this.mockData).pipe(delay(500));
  }
} 