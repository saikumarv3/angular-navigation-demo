import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanService {
  private shouldFail = false; // Set this to true to make LAN check fail

  setShouldFail(value: boolean) {
    this.shouldFail = value;
  }

  checkLan(): Observable<boolean> {
    if (this.shouldFail) {
      return of(false).pipe(delay(1));
    }
    return of(true).pipe(delay(1));
  }
} 