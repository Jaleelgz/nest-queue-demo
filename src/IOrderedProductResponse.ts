export interface IOrderedProductResponse {
  qty: number;
  product: {
    name: string;
    qty: number;
    brand: string;
    id: number;
  };
}
