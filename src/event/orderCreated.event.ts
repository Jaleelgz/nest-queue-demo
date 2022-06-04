export class OrderCreatedEvent {
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
}
