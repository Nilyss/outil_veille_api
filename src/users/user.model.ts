import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document

@Schema({ collection: 'users' })
export class User {
  @Prop({ type: String, default: () => new mongoose.Types.ObjectId() })
  _id: string
  @Prop()
  email: string
  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre<UserDocument>('save', async function (next): Promise<void> {
  if (!this.isModified('password')) {
    return next()
  }
  const salt: string = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})
