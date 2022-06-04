import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderRequestDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  qty: number;
}
