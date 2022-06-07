import { CreateOrderResponseDTO } from 'src/dto/createOrderResponse.dto';

export class OrderFailedEvent {
  constructor(public readonly order: CreateOrderResponseDTO) {}
}
