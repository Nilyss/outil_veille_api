import { Module } from '@nestjs/common'
import { YoutubeController } from './youtube.controller'
import { YoutubeService } from './youtube.service'
import { youtubeProvider } from './youtube.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [YoutubeController],
  providers: [YoutubeService, ...youtubeProvider],
})
export class YoutubeModule {}
