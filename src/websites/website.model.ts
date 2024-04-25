import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'websites' })
export class Website extends Document {
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

export const WebsiteSchema = SchemaFactory.createForClass(Website)
