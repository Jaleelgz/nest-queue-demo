import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { SseService } from '../sse.service';
import { OrderFailedEvent } from './orderFailed.event';

@EventsHandler(OrderFailedEvent)
export class OrderFailedEventHandler
  implements IEventHandler<OrderFailedEvent>
{
  constructor(private readonly sseService: SseService) {}
  public handle(event: OrderFailedEvent) {
    console.log('OrderFailedEvent', event.order);
    this.sseService.emitOrderEvent(event.order, 'Order failed');
  }
}
