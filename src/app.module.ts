import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OrderConsumer } from './order.consumer';
import { OrderController } from './order.controller';
import { OrderProducerService } from './order.producer.service';
import { OrderService } from './order.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 5003,
      },
    }),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderProducerService, OrderConsumer],
})
export class AppModule {}
