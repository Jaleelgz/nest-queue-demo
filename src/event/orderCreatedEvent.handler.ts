import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SseService } from '../sse.service';
import { OrderCreatedEvent } from './orderCreated.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent>
{
  constructor(private readonly sseService: SseService) {}
  public handle(event: OrderCreatedEvent) {
    console.log('OrderCreatedEvent', event.order);
    this.sseService.emitOrderEvent(event.order, 'Order Created successfully');
  }
}
