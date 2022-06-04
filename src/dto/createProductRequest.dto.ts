import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  qty: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  price: number;
}
