export interface IOrderedProductResponse {
  products: {
    qty: number;
    product: {
      name: string;
      qty: number;
      brand: string;
      id: string;
      price: number;
    };
  }[];
  finalAmount: number;
  id: string;
  userId: string;
}
