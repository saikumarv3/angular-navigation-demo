export interface Page {
  id: string;
  title: string;
}

export const PAGES: Page[] = [
  { id: 'product-selection', title: 'Product Selection' },
  { id: 'advisor-terms', title: 'Advisor Terms' },
  { id: 'checkout', title: 'Checkout' },
  { id: 'address-info', title: 'Address Info' }
]; 