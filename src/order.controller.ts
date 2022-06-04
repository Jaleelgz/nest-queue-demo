import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateOrderRequestDTO } from './dto/createOrderRequest.dto';
import { CreateOrderResponseDTO } from './dto/createOrderResponse.dto';
import { CreateProductRequestDTO } from './dto/createProductRequest.dto';
import { OrderService } from './order.service';
import { ProductDTO } from './dto/product.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ description: 'Return hello world' })
  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }

  @ApiOperation({ description: 'Return all products' })
  @Get('allProducts')
  getAllProducts(): Promise<ProductDTO[]> {
    return this.orderService.getAllProducts();
  }

  @ApiOperation({ description: 'create new product' })
  @ApiBody({
    type: CreateProductRequestDTO,
  })
  @ApiResponse({
    type: ProductDTO,
  })
  @Post('product')
  async createProduct(
    @Body() body: CreateProductRequestDTO,
  ): Promise<ProductDTO> {
    return this.orderService.createProduct(body);
  }

  @ApiOperation({ description: 'Return order list' })
  @ApiBody({
    type: [CreateOrderRequestDTO],
  })
  @ApiResponse({
    type: CreateOrderResponseDTO,
  })
  @Post('order')
  async createOrder(
    @Body() body: CreateOrderRequestDTO[],
  ): Promise<CreateOrderResponseDTO> {
    return this.orderService.createOrder(body);
  }
}
