import { Connection } from 'mongoose'
import { PodcastsSchema } from './podcasts.model'

export const podcastsProvider = [
  {
    provide: 'podcasts',
    useFactory: (connection: Connection) =>
      connection.model('Podcasts', PodcastsSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
