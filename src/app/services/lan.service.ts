import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanService {
  checkLan(): Observable<boolean> {
    // Randomly return success or error for demonstration
    const isSuccess = Math.random() > 0.5;
    
    return of(isSuccess).pipe(
      delay(1) // Reduced from 1000ms to 300ms for faster response
    );
  }
} 