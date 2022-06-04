import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  OrderProductsSchema,
  OrderProductsSchemaObject,
} from './orderProducts.schema';

export type OrderDocument = OrderSchema & Document;

@Schema()
export class OrderSchema {
  @Prop({ required: true, type: Number })
  finalAmount: number;

  @Prop({ required: true, unique: true, type: String })
  id: string;

  @Prop({ required: true, type: [OrderProductsSchemaObject] })
  products: OrderProductsSchema[];
}

export const OrderSchemaObject = SchemaFactory.createForClass(OrderSchema);
