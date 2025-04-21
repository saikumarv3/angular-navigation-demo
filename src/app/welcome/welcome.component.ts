import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CarOption {
  carType: string;
  carModel: string;
  fuelType: string;
  prefillData: {
    'car-type': string;
    'car-model': string;
    'car-year': string;
    'transmission': string;
    'fuel-type': string;
    'state': string;
    'zip-code': string;
  };
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  carOptions: CarOption[] = [
    {
      carType: 'SUV',
      carModel: 'Toyota RAV4',
      fuelType: 'Hybrid',
      prefillData: {
        'car-type': 'SUV',
        'car-model': 'Toyota RAV4',
        'car-year': '2023',
        'transmission': 'automatic',
        'fuel-type': 'hybrid',
        'state': 'CA',
        'zip-code': '90210'
      }
    },
    {
      carType: 'Sedan',
      carModel: 'Honda Accord',
      fuelType: 'Gasoline',
      prefillData: {
        'car-type': 'Sedan',
        'car-model': 'Honda Accord',
        'car-year': '2022',
        'transmission': 'automatic',
        'fuel-type': 'gasoline',
        'state': 'NY',
        'zip-code': '10001'
      }
    },
    {
      carType: 'Electric',
      carModel: 'Tesla Model 3',
      fuelType: 'Electric',
      prefillData: {
        'car-type': 'Sedan',
        'car-model': 'Tesla Model 3',
        'car-year': '2023',
        'transmission': 'automatic',
        'fuel-type': 'electric',
        'state': 'CA',
        'zip-code': '94025'
      }
    }
  ];

  constructor(private router: Router) {}

  handlePrefill(prefillData: any): void {
    this.router.navigate(['/page', 'Select Your Car'], { 
      state: { prefillData } 
    });
  }

  handleManualEntry(): void {
    this.router.navigate(['/page', 'Select Your Car']);
  }
}
