import { Connection } from 'mongoose'
import { TwitterSchema } from './twitter.model'

export const twitterProvider = [
  {
    provide: 'twitter',
    useFactory: (connection: Connection) =>
      connection.model('Twitter', TwitterSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
