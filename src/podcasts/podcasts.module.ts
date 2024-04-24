import { Module } from '@nestjs/common'
import { PodcastsController } from './podcasts.controller'
import { PodcastsService } from './podcasts.service'
import { podcastsProvider } from './podcasts.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [PodcastsController],
  providers: [PodcastsService, ...podcastsProvider],
})
export class PodcastsModule {}
