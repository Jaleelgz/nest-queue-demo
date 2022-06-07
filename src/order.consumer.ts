import { Process, Processor } from '@nestjs/bull';
import { EventBus } from '@nestjs/cqrs';
import { InjectConnection } from '@nestjs/mongoose';
import { Job } from 'bull';
import mongoose from 'mongoose';
import { OrderCreatedEvent } from './event/orderCreated.event';
import { OrderFailedEvent } from './event/orderFailed.event';
import { IOrderedProductResponse } from './IOrderedProductResponse';
import { OrderRepository } from './order.repository';

@Processor('order-queue')
export class OrderConsumer {
  constructor(
    private readonly orderRepository: OrderRepository,
    @InjectConnection() private readonly connection: mongoose.Connection,
    private readonly eventBus: EventBus,
  ) {}
  @Process('order')
  async readOrder(orderJob: Job<IOrderedProductResponse>) {
    const orderSession = await this.connection.startSession();
    orderSession.startTransaction();
    try {
      for (const orderProduct of orderJob.data.products) {
        await this.orderRepository.updateProductQuantity(
          orderProduct.product.id,
          orderProduct.product.qty - orderProduct.qty,
          orderSession,
        );
      }
      await this.orderRepository.createOrder(orderJob.data, orderSession);
      await orderSession.commitTransaction();
      this.eventBus.publish(new OrderCreatedEvent(orderJob.data));
    } catch (error) {
      console.log('error', error);
      await orderSession.abortTransaction();
      this.eventBus.publish(new OrderFailedEvent(orderJob.data));
    } finally {
      await orderSession.endSession();
    }
  }
}
