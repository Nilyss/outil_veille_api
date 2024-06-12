import { Injectable } from '@nestjs/common'

export type User = {
  userID: number
  userName: string
  password: string
}

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userID: 1,
      userName: 'john',
      password: 'changeme',
    },
    {
      userID: 2,
      userName: 'maria',
      password: 'guess',
    },
  ]

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === username)
  }
}
