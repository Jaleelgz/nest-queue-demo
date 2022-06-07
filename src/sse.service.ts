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

  subscribeOrderEvent(userId: string) {
    return fromEvent(this.emitter, userId);
  }

  async emitOrderEvent(data: CreateOrderResponseDTO, message: string) {
    const resData = { ...data, message: message };
    this.emitter.emit(data.userId, JSON.stringify(resData));
  }
}
