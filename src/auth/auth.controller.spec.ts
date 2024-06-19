import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthGuard } from './auth.guard'
import { Reflector } from '@nestjs/core'
import { UnauthorizedException, ExecutionContext } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

describe('AuthController', () => {
  let authController: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testSecret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
        AuthGuard,
        Reflector,
      ],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('signIn', () => {
    it('should return an access token', async () => {
      const signInDto = { userName: 'testUser', password: 'testPass' }
      const result = { access_token: 'jwtToken' }
      jest.spyOn(authService, 'signIn').mockResolvedValue(result)

      expect(await authController.signIn(signInDto)).toBe(result)
    })
  })

  describe('getProfile', () => {
    it('should return the user profile', () => {
      const req = { user: { userID: 1, userName: 'testUser' } }
      expect(authController.getProfile(req)).toBe(req.user)
    })
  })
})

describe('AuthGuard', () => {
  let authGuard: AuthGuard
  let jwtService: JwtService
  let reflector: Reflector

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testSecret',
        }),
        ConfigModule.forRoot({
          load: [() => ({ JWT_SECRET_KEY: 'testSecret' })],
        }),
      ],
      providers: [
        AuthGuard,
        JwtService,
        Reflector,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_SECRET_KEY') {
                return 'testSecret'
              }
            }),
          },
        },
      ],
    }).compile()

    authGuard = module.get<AuthGuard>(AuthGuard)
    jwtService = module.get<JwtService>(JwtService)
    reflector = module.get<Reflector>(Reflector)
  })

  it('should return true for public routes', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true)
    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext

    expect(await authGuard.canActivate(context)).toBe(true)
  })

  it('should throw an UnauthorizedException if no token is provided', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false)
    const request = {
      headers: {},
    }
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    )
  })

  it('should throw an UnauthorizedException for invalid JWT', async () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false)
    const request = {
      headers: {
        authorization: 'Bearer invalidToken',
      },
    }
    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error())
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext

    await expect(authGuard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    )
  })
})
