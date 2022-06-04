import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateOrderRequestDTO } from './createOrderRequest.dto';
import { CreateOrderResponseDTO } from './createOrderResponse.dto';
import { IOrderedProductResponse } from './IOrderedProductResponse';
import { OrderProducerService } from './order.producer.service';
import * as products from './products.json';

@Injectable()
export class OrderService {
  constructor(private readonly orderProducerService: OrderProducerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getAllProducts(): any {
    return products;
  }

  createOrder(
    createOrderRequestDTO: CreateOrderRequestDTO[],
  ): CreateOrderResponseDTO {
    if (createOrderRequestDTO.length === 0)
      throw new BadRequestException('Length should not be zero');
    const orderedProducts = [];
    let finalAmount = 0;
    createOrderRequestDTO.map((order) => {
      const orderedProduct = products.find(
        (product) => product.id === order.productId,
      );
      if (!orderedProduct) {
        throw new NotFoundException('product not found');
      }
      if (!(order.qty <= orderedProduct.qty)) {
        throw new BadRequestException('Product not in stock');
      }
      finalAmount += orderedProduct.price * order.qty;
      orderedProducts.push({
        qty: order.qty,
        product: orderedProduct,
      });
    });
    const orderData = {
      products: orderedProducts,
      finalAmount: finalAmount,
      id: randomUUID(),
    };
    this.orderProducerService.addOrderJobToQueue(orderData);
    return orderData;
  }
}
