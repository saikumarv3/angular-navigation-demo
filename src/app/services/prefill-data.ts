export interface CarOption {
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

export const CAR_OPTIONS: CarOption[] = [
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