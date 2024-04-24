import { Connection } from 'mongoose'
import { RssSchema } from './rss.model'
export const rssProvider = [
  {
    provide: 'rss',
    useFactory: (connection: Connection) => connection.model('Rss', RssSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
