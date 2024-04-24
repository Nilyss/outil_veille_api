import * as mongoose from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { Logger } from '@nestjs/common'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const logger: Logger = new Logger('DatabaseProvider')
      const userName = configService.get('SRV_USERNAME')
      const password = configService.get('SRV_PASSWORD')
      const cluster = configService.get('SRV_CLUSTER')
      const dbName = configService.get('SRV_BDD')
      const uri: string = `mongodb+srv://${userName}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

      try {
        const dbConnection = await mongoose.connect(uri)
        logger.log(`Connected to ${dbConnection.connection.name}`)
        return dbConnection
      } catch (error) {
        logger.error('Failed to connect to the database', error.toString())
        throw error
      }
    },
    inject: [ConfigService],
  },
]
