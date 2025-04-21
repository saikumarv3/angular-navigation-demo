import { Component, EventEmitter, Output } from '@angular/core';
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
  selector: 'app-contract-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-selector.component.html',
  styleUrls: ['./contract-selector.component.scss']
})
export class ContractSelectorComponent {
  @Output() prefillSelected = new EventEmitter<boolean>();
  showPageContent = false;

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

  handlePrefill(prefillData: any) {
    console.log('Contract Selector - Sending prefill data:', prefillData);
    // Create a new object to ensure proper state passing
    const navigationState = { prefillData: { ...prefillData } };
    console.log('Contract Selector - Navigation state:', navigationState);
    
    this.router.navigate(['/page', 'Select Your Car'], { 
      state: navigationState 
    }).then(() => {
      console.log('Contract Selector - Navigation completed');
    }).catch(error => {
      console.error('Contract Selector - Navigation error:', error);
    });
    
    this.prefillSelected.emit(true);
    this.showPageContent = true;
  }

  handleManualEntry() {
    this.router.navigate(['/page', 'Select Your Car']);
    this.prefillSelected.emit(false);
    this.showPageContent = true;
  }
} 