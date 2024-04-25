import { Connection } from 'mongoose'
import { YoutubeSchema } from './youtube.model'

export const youtubeProvider = [
  {
    provide: 'youtube',
    useFactory: (connection: Connection) =>
      connection.model('youtube', YoutubeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
