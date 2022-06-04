import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from './orderCreated.event';

@Injectable()
export class OrderCreatedEventListener {
  @OnEvent('order.created')
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    console.log('event', event);
  }
}
