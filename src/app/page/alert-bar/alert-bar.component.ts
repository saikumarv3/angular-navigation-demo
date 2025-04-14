import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent {
  @Input() message: string = '';
  @Input() type: 'error' | 'warning' | 'info' = 'info';
} 