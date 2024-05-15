import { Get, Controller } from '@nestjs/common'
import { Protected } from '@ndeitch/nestjs-keycloak'

@Controller('auth')
export class AuthController {
  @Get()
  @Protected()
  getUser(): string {
    return 'Your token is valid'
  }
}
