import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectConnection } from '@nestjs/mongoose';
import { Job } from 'bull';
import mongoose from 'mongoose';
import { OrderCreatedEvent } from './event/orderCreated.event';
import { IOrderedProductResponse } from './IOrderedProductResponse';
import { OrderRepository } from './order.repository';

@Processor('order-queue')
export class OrderConsumer {
  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private eventEmitter: EventEmitter2,
  ) {}
  @Process('order')
  async readOrder(orderJob: Job<IOrderedProductResponse>) {
    const orderSession = await this.connection.startSession();
    orderSession.startTransaction();
    try {
      for (const orderProduct of orderJob.data.products) {
        const productRes = await this.orderRepository.updateProductQuantity(
          orderProduct.product.id,
          orderProduct.product.qty - orderProduct.qty,
          orderSession,
        );
      }
      const orderRes = await this.orderRepository.createOrder(
        orderJob.data,
        orderSession,
      );
      await orderSession.commitTransaction();

      let orderCreatedEvent = new OrderCreatedEvent();
      orderCreatedEvent = orderJob.data;
      this.eventEmitter.emit('order.created', orderCreatedEvent);
    } catch (error) {
      await orderSession.abortTransaction();
    } finally {
      await orderSession.endSession();
    }
  }
}
