import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Response,
} from '@nestjs/common'
import { SingInDto } from './dto/sign-in.dto'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { Public } from '../decorators/public.decorator'
import { Response as Res } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SingInDto, @Response() res: Res) {
    const { access_token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    )
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    })
    res.send({ message: 'Login successfull' })
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
