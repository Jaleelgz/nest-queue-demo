import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateOrderProductsRequestDTO } from './createOrderProductsRequest.dto';

export class CreateOrderRequestDTO {
  @ApiProperty({ type: [CreateOrderProductsRequestDTO] })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateOrderProductsRequestDTO)
  products: CreateOrderProductsRequestDTO[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUUID('4')
  userId: string;
}
