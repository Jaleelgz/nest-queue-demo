import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateOrderRequestDTO } from './createOrderRequest.dto';
import { CreateOrderResponseDTO } from './createOrderResponse.dto';
import { OrderService } from './order.service';

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
  getAllProducts(@Res() response: Response): any {
    const responseData = this.orderService.getAllProducts();
    if (!responseData) return response.status(HttpStatus.BAD_REQUEST).json();
    return response.status(HttpStatus.OK).json(responseData);
  }

  @ApiOperation({ description: 'Return order list' })
  @ApiBody({
    type: [CreateOrderRequestDTO],
  })
  @ApiResponse({
    type: CreateOrderResponseDTO,
  })
  @Post('order')
  createOrder(
    @Res() response: Response,
    @Body() body: CreateOrderRequestDTO[],
  ): CreateOrderResponseDTO | any {
    const responseData = this.orderService.createOrder(body);
    if (!responseData) return response.status(HttpStatus.BAD_REQUEST).json();
    return response.status(HttpStatus.CREATED).json(responseData);
  }
}
