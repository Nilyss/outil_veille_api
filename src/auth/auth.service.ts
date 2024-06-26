import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email)
    if (
      !user ||
      !(await this.userService.validatePassword(pass, user.password))
    ) {
      console.log('Invalid password')
      throw new UnauthorizedException('Invalid username or password')
    }
    const payload = { sub: user._id, email: user.email }
    const accessToken = await this.jwtService.signAsync(payload)
    console.log('Access Token: ', accessToken)
    return {
      access_token: accessToken,
    }
  }
}
