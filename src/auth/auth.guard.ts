import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import { ConfigService } from '@nestjs/config'

const configService = new ConfigService()

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromCookie(request)
    if (!token) {
      throw new UnauthorizedException('No token provided')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configService.get<string>('JWT_SECRET_KEY'),
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies['access_token']
  }
}
