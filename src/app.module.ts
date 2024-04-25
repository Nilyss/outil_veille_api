import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AiModule } from './ai/ai.module'
import { FaqModule } from './faq/faq.module'
import { PodcastsModule } from './podcasts/podcasts.module'
import { RssModule } from './rss/rss.module'
import { TwitterModule } from './twitter/twitter.module'
import { WebsiteModule } from './websites/website.module'
import { YoutubeModule } from './youtube/youtube.module'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AiModule,
    FaqModule,
    PodcastsModule,
    RssModule,
    TwitterModule,
    WebsiteModule,
    YoutubeModule,
  ],
})
export class AppModule {}
