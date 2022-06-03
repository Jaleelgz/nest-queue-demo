import { ApiProperty } from '@nestjs/swagger';
import { IOrderedProductResponse } from './IOrderedProductResponse';
import { ProductDTO } from './product.dto';

export class CreateOrderResponseDTO implements IOrderedProductResponse {
  @ApiProperty({ type: ProductDTO })
  product: ProductDTO;

  @ApiProperty({ type: Number })
  qty: number;
}
