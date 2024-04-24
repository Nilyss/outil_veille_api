import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'ai' })
export class Ai extends Document {
  @Prop()
  link: string

  @Prop()
  title: string

  @Prop()
  page: string
}

export const AiSchema = SchemaFactory.createForClass(Ai)
