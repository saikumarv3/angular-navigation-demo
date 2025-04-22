import { Injectable } from '@angular/core';
import { CAR_OPTIONS, CarOption } from './prefill-data';

@Injectable({
  providedIn: 'root'
})
export class PrefillService {
  constructor() {}

  getCarOptions(): CarOption[] {
    return CAR_OPTIONS;
  }

  getPrefillData(carType: string, carModel: string): any {
    const option = CAR_OPTIONS.find(
      opt => opt.carType === carType && opt.carModel === carModel
    );
    return option ? option.prefillData : null;
  }
} 