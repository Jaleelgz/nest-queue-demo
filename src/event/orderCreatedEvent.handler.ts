import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { OrderCreatedEvent } from './orderCreated.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent>
{
  handle(event: OrderCreatedEvent) {
    console.log('OrderCreatedEvent', event.order);
  }
}
