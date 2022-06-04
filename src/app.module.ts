import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, OrderSchemaObject } from './db/order.schema';
import { ProductSchema, ProductSchemaObject } from './db/product.schema';
import { OrderCreatedEventListener } from './event/orderCreatedEvent.listener';
import { OrderConsumer } from './order.consumer';
import { OrderController } from './order.controller';
import { OrderProducerService } from './order.producer.service';
import { OrderRepository } from './order.repository';
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
    MongooseModule.forRoot(
      'mongodb://Jaleelgz:27017,Jaleelgz:27018,Jaleelgz:27019/queue?replicaSet=rs',
    ),
    EventEmitterModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: OrderSchema.name,
        schema: OrderSchemaObject,
        collection: 'orders',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: ProductSchema.name,
        schema: ProductSchemaObject,
        collection: 'products',
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderProducerService,
    OrderConsumer,
    OrderRepository,
    OrderCreatedEventListener,
  ],
})
export class AppModule {}
