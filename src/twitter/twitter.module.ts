import { Module } from '@nestjs/common'
import { TwitterController } from './twitter.controller'
import { TwitterService } from './twitter.service'
import { twitterProvider } from './twitter.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [TwitterController],
  providers: [TwitterService, ...twitterProvider],
})
export class TwitterModule {}
