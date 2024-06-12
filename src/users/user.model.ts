import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: String, default: () => new mongoose.Types.ObjectId() })
  _id: string
  @Prop()
  userName: string
  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
