import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'

describe('AuthService', () => {
  let authService: AuthService
  let usersService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
  })

  describe('signIn', () => {
    it('should return a JWT token if credentials are valid', async () => {
      const user = { userID: 1, userName: 'testUser', password: 'testPass' }
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user)
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('jwtToken')

      const result = await authService.signIn('testUser', 'testPass')
      expect(result).toEqual({ access_token: 'jwtToken' })
    })

    it('should throw an UnauthorizedException if credentials are invalid', async () => {
      const user = { userID: 1, userName: 'testUser', password: 'testPass' }
      jest.spyOn(usersService, 'findOne').mockResolvedValue(user)

      await expect(authService.signIn('testUser', 'wrongPass')).rejects.toThrow(
        UnauthorizedException,
      )
    })

    it('should throw an UnauthorizedException if user is not found', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null)

      await expect(authService.signIn('testUser', 'testPass')).rejects.toThrow(
        UnauthorizedException,
      )
    })
  })
})
