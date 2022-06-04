import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderedProductResponse } from './createOrderedProductResponse';
import { IOrderedProductResponse } from '../IOrderedProductResponse';

export class CreateOrderResponseDTO implements IOrderedProductResponse {
  @ApiProperty({ type: [CreateOrderedProductResponse] })
  products: CreateOrderedProductResponse[];

  @ApiProperty()
  finalAmount: number;

  @ApiProperty()
  id: string;
}
