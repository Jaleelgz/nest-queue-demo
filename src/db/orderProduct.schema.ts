import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderProductDocument = OrderProductSchema & Document;

@Schema()
export class OrderProductSchema {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  id: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: true, type: Number })
  qty: number;
}

export const OrderProductSchemaObject =
  SchemaFactory.createForClass(OrderProductSchema);
