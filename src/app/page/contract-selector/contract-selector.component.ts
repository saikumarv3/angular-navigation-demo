import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contract-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contract-selector.component.html',
  styleUrls: ['./contract-selector.component.scss']
})
export class ContractSelectorComponent {
  constructor() {}
} 