import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = ProductSchema & Document;

@Schema()
export class ProductSchema {
  @Prop({ unique: true, required: true, type: String })
  name: string;

  @Prop({ unique: true, required: true, type: String })
  id: string;

  @Prop({ type: String, required: true })
  brand: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ required: true, type: Number })
  qty: number;
}

export const ProductSchemaObject = SchemaFactory.createForClass(ProductSchema);
