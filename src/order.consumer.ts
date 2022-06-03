import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('order-queue')
export class OrderConsumer {
  @Process('order')
  readOrder(orderJob: Job<unknown>) {
    console.log('orderJob', orderJob.data);
  }
}
