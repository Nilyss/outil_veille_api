import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'rss' })
export class Rss extends Document {
  @Prop()
  _id: string
  @Prop()
  id: string
  @Prop()
  page: string
  @Prop()
  title: string
  @Prop()
  url: string
}

export const RssSchema = SchemaFactory.createForClass(Rss)
