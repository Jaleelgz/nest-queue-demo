import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from './product.dto';

export class CreateOrderedProductResponse {
  @ApiProperty({ type: ProductDTO })
  product: ProductDTO;

  @ApiProperty({ type: Number })
  qty: number;
}
