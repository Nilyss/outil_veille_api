import { Connection } from 'mongoose'
import { AiSchema } from './ai.model'

export const aiProvider = [
  {
    provide: 'ai',
    useFactory: (connection: Connection) => connection.model('Ai', AiSchema),
    inject: ['DATABASE_CONNECTION'],
  },
]
