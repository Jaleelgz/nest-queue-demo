import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  OrderProductSchema,
  OrderProductSchemaObject,
} from './orderProduct.schema';

export type OrderProductsDocument = OrderProductsSchema & Document;

@Schema()
export class OrderProductsSchema {
  @Prop({ type: Number, required: true })
  qty: number;

  @Prop({ type: OrderProductSchemaObject, required: true })
  product: OrderProductSchema;
}

export const OrderProductsSchemaObject =
  SchemaFactory.createForClass(OrderProductsSchema);
