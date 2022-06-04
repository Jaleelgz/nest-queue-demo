import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  price: number;
}
