import { CreateOrderResponseDTO } from 'src/dto/createOrderResponse.dto';

export class OrderCreatedEvent {
  constructor(public readonly order: CreateOrderResponseDTO) {}
}
