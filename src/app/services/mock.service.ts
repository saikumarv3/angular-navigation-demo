import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string;
  type: string;
  state: string;
  lastRenewalDate: string;
  nextRenewalDate: string;
  prefillData: {
    fullRenewal: string;
    addingMoney: string;
    lanCheck: string;
    safeSellCheck: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private mockCustomer: Customer = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567'
  };

  private mockProducts: Product[] = [
    {
      id: '1',
      type: 'Laptop',
      state: 'CA',
      lastRenewalDate: '2023-01-01',
      nextRenewalDate: '2024-01-01',
      prefillData: {
        fullRenewal: 'No',
        addingMoney: 'No',
        lanCheck: 'Yes',
        safeSellCheck: 'Yes'
      }
    },
    {
      id: '2',
      type: 'Phone',
      state: 'NY',
      lastRenewalDate: '2023-02-01',
      nextRenewalDate: '2024-02-01',
      prefillData: {
        fullRenewal: 'Yes',
        addingMoney: 'No',
        lanCheck: 'No',
        safeSellCheck: 'Yes'
      }
    },
    {
      id: '3',
      type: 'Home',
      state: 'TX',
      lastRenewalDate: '2023-03-01',
      nextRenewalDate: '2024-03-01',
      prefillData: {
        fullRenewal: 'Yes',
        addingMoney: 'No',
        lanCheck: 'Yes',
        safeSellCheck: 'No'
      }
    }
  ];

  getCustomerData(): Observable<{ customer: Customer; products: Product[] }> {
    return of({
      customer: this.mockCustomer,
      products: this.mockProducts
    });
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product);
  }
} 