import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'faq' })
export class Faq extends Document {
  @Prop()
  _id: string
  @Prop()
  title: string
  @Prop()
  content: string
  @Prop()
  id: number
}

export const FaqSchema = SchemaFactory.createForClass(Faq)
