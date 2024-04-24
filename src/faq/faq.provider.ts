import { Connection } from 'mongoose'
import { FaqSchema } from './faq.model'

export const faqProvider = [
  {
    provide: 'faq',
    useFactory: (connection: Connection) => connection.model('Faq', FaqSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
