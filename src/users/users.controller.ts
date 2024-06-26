import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ConflictException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'
import { User } from './user.model'
import { Public } from '../decorators/public.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return this.usersService.create(createUserDto)
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message)
      }
      throw error
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':email')
  findOne(@Param('email') email: string): Promise<User | undefined> {
    return this.usersService.findOne(email)
  }
}
