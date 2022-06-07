import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrderSchema, OrderSchemaObject } from './db/order.schema';
import { ProductSchema, ProductSchemaObject } from './db/product.schema';
import { OrderCreatedEventHandler } from './event/orderCreatedEvent.handler';
import { OrderFailedEventHandler } from './event/orderFailedEvent.handler';
import { OrderConsumer } from './order.consumer';
import { OrderController } from './order.controller';
import { OrderProducerService } from './order.producer.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { SseService } from './sse.service';

@Module({
  imports: [
    CqrsModule,
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    SseService,
    OrderProducerService,
    OrderConsumer,
    OrderRepository,
    OrderCreatedEventHandler,
    OrderFailedEventHandler,
  ],
})
export class AppModule {}
