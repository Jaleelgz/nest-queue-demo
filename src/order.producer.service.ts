import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { IOrderedProductResponse } from './IOrderedProductResponse';

@Injectable()
export class OrderProducerService {
  constructor(@InjectQueue('order-queue') private queue: Queue) {}

  async addOrderJobToQueue(orderList: IOrderedProductResponse[]) {
    await this.queue.add('order', orderList);
  }
}
