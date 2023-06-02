export interface Transaction {
  code: string;
  totalWithoutTax: number;
  tax: number;
  carRent: number;
  carPickUp: number;
  status: string;
}
