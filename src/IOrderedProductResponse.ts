export interface IOrderedProductResponse {
  products: {
    qty: number;
    product: {
      name: string;
      qty: number;
      brand: string;
      id: number;
    };
  }[];
  finalAmount: number;
  id: string;
}
