import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'podcasts' })
export class Podcasts extends Document {
  @Prop()
  page: string
  @Prop()
  title: string
  @Prop()
  url: string
}

export const PodcastsSchema = SchemaFactory.createForClass(Podcasts)
