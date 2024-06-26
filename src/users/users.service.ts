import { ConflictException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './user.model'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec()
    if (existingUser) {
      throw new ConflictException('Email already exists')
    }

    const newUser = new this.userModel(createUserDto)
    return newUser.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec()
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}
