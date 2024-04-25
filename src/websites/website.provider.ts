import { Connection } from 'mongoose'
import { WebsiteSchema } from './website.model'

export const websiteProvider = [
  {
    provide: 'websites',
    useFactory: (connection: Connection) =>
      connection.model('Website', WebsiteSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
