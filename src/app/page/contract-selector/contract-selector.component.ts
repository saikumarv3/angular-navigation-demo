import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrefillService } from '../../services/prefill.service';
import { CarOption } from '../../services/prefill-data';

@Component({
  selector: 'app-contract-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-selector.component.html',
  styleUrls: ['./contract-selector.component.scss']
})
export class ContractSelectorComponent implements OnInit {
  @Output() prefillSelected = new EventEmitter<boolean>();
  showPageContent = false;
  carOptions: CarOption[] = [];

  constructor(
    private router: Router,
    private prefillService: PrefillService
  ) {}

  ngOnInit(): void {
    this.carOptions = this.prefillService.getCarOptions();
  }

  handlePrefill(prefillData: any) {
    console.log('Contract Selector - Sending prefill data:', prefillData);
    
    // Navigate with prefill data
    this.router.navigate(['/page', 'Select Your Car'], { 
      state: { prefillData: prefillData }
    });
    
    this.prefillSelected.emit(true);
    this.showPageContent = true;
  }

  handleManualEntry() {
    this.router.navigate(['/page', 'Select Your Car'], { replaceUrl: true });
    this.prefillSelected.emit(false);
    this.showPageContent = true;
  }
} 