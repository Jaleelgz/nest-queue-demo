import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { CreateOrderResponseDTO } from './dto/createOrderResponse.dto';
import { OrderDocument, OrderSchema } from './db/order.schema';
import { ProductDocument, ProductSchema } from './db/product.schema';
import { ProductDTO } from './dto/product.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(OrderSchema.name) private orderModel: Model<OrderDocument>,
    @InjectModel(ProductSchema.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(product: ProductDTO): Promise<ProductDTO> {
    const createdCat = new this.productModel(product);
    return createdCat.save();
  }

  async updateProductQuantity(
    productId: string,
    newQty: number,
    session: ClientSession,
  ): Promise<ProductDTO> {
    return this.productModel.findOneAndUpdate(
      { id: productId },
      { qty: newQty },
      { session },
    );
  }

  async createOrder(
    order: CreateOrderResponseDTO,
    session: ClientSession,
  ): Promise<CreateOrderResponseDTO> {
    const createdCat = new this.orderModel(order);
    return createdCat.save({ session });
  }

  async findAllProducts(): Promise<ProductDTO[]> {
    return this.productModel.find().exec();
  }

  async findProductById(productId: string): Promise<ProductDTO> {
    return this.productModel.findOne({ id: productId }).exec();
  }

  async findOrderById(orderId: string): Promise<CreateOrderResponseDTO> {
    return this.orderModel.findOne({ id: orderId }).exec();
  }

  async findAllOrders(): Promise<CreateOrderResponseDTO[]> {
    return this.orderModel.find().exec();
  }
}
