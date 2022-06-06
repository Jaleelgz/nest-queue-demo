import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateOrderRequestDTO } from './dto/createOrderRequest.dto';
import { CreateOrderResponseDTO } from './dto/createOrderResponse.dto';
import { CreateProductRequestDTO } from './dto/createProductRequest.dto';
import { OrderProducerService } from './order.producer.service';
import { OrderRepository } from './order.repository';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderProducerService: OrderProducerService,
    private readonly orderRepository: OrderRepository,
  ) {}

  getAllProducts(): Promise<ProductDTO[]> {
    return this.orderRepository.findAllProducts();
  }

  getAllOrders(): Promise<CreateOrderResponseDTO[]> {
    return this.orderRepository.findAllOrders();
  }

  async createProduct(product: CreateProductRequestDTO): Promise<ProductDTO> {
    const createProduct = { ...product, id: randomUUID() };
    return this.orderRepository.createProduct(createProduct);
  }

  async createOrder(
    createOrderRequestDTO: CreateOrderRequestDTO,
  ): Promise<CreateOrderResponseDTO> {
    if (createOrderRequestDTO?.products.length === 0)
      throw new BadRequestException('Length should not be zero');
    const orderedProducts = [];
    let finalAmount = 0;
    for (let order of createOrderRequestDTO.products) {
      const orderedProduct = await this.orderRepository.findProductById(
        order.productId,
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
    }
    const orderData = {
      userId: createOrderRequestDTO.userId,
      products: orderedProducts,
      finalAmount: finalAmount,
      id: randomUUID(),
    };
    await this.orderProducerService.addOrderJobToQueue(orderData);
    return orderData;
  }

  async getProductById(productId: string): Promise<ProductDTO> {
    return this.orderRepository.findProductById(productId);
  }
}
