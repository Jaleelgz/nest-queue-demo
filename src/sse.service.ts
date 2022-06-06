import { Injectable } from '@nestjs/common';
import { fromEvent } from 'rxjs';
import { EventEmitter } from 'events';
import { CreateOrderResponseDTO } from './dto/createOrderResponse.dto';

@Injectable()
export class SseService {
  private readonly emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribeOrderCreatedEvent(userId: string) {
    return fromEvent(this.emitter, userId);
  }

  async emitOrderCreatedEvent(data: CreateOrderResponseDTO) {
    this.emitter.emit(data.userId, data);
  }
}
