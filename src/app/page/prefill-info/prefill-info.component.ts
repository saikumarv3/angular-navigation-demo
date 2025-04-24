import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prefill-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prefill-info.component.html',
  styleUrls: ['./prefill-info.component.scss']
})
export class PrefillInfoComponent {
  @Input() productType: string = '';
  @Input() state: string = '';
} 