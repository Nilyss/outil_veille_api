import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'twitter' })
export class Twitter extends Document {
  @Prop()
  _id: string
  @Prop()
  name: string
  @Prop()
  page: string
  @Prop()
  url: string
}

export const TwitterSchema = SchemaFactory.createForClass(Twitter)
