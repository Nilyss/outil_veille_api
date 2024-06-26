import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { Document } from 'mongoose'
import { User } from '../users/user.model'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ user: any; access_token: string }> {
    const user = (await this.userService.findOne(email)) as Document & User
    if (
      !user ||
      !(await this.userService.validatePassword(pass, user.password))
    ) {
      console.log('Invalid password')
      throw new UnauthorizedException('Invalid username or password')
    }
    const payload = { sub: user._id, email: user.email }
    const accessToken: string = await this.jwtService.signAsync(payload)
    console.log('Access Token: ', accessToken)

    const userObj = user.toObject()
    const { password, __v, ...userWithoutSensitiveInfo } = userObj

    return { user: userWithoutSensitiveInfo, access_token: accessToken }
  }
}
