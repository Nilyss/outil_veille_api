import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'youtube' })
export class Youtube extends Document {
  @Prop()
  _id: string
  @Prop()
  name: string
  @Prop()
  url: string
  @Prop()
  description: string
  @Prop()
  page: string
}

export const YoutubeSchema = SchemaFactory.createForClass(Youtube)
