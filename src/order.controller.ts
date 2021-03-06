import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderRequestDTO } from './dto/createOrderRequest.dto';
import { CreateOrderResponseDTO } from './dto/createOrderResponse.dto';
import { CreateProductRequestDTO } from './dto/createProductRequest.dto';
import { OrderService } from './order.service';
import { ProductDTO } from './dto/product.dto';
import { SseService } from './sse.service';
import { interval, map, Observable } from 'rxjs';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly sseService: SseService,
  ) {}

  @ApiOperation({ description: 'Return all products' })
  @Get('allProducts')
  getAllProducts(): Promise<ProductDTO[]> {
    return this.orderService.getAllProducts();
  }

  @ApiOperation({ description: 'Return all orders' })
  @Get('allOrders')
  getAllOrders(): Promise<CreateOrderResponseDTO[]> {
    return this.orderService.getAllOrders();
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

  @ApiOperation({ description: 'Create new order' })
  @ApiBody({
    type: CreateOrderRequestDTO,
  })
  @ApiResponse({
    type: CreateOrderResponseDTO,
  })
  @Post('order')
  async createOrder(
    @Body() body: CreateOrderRequestDTO,
  ): Promise<CreateOrderResponseDTO> {
    return this.orderService.createOrder(body);
  }

  @Sse('sse/:userId')
  sse(@Param('userId') userId: string) {
    console.log('userId', userId);
    return this.sseService.subscribeOrderEvent(userId);
    // return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}
