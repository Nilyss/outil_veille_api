import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AiModule } from './ai/ai.module'
import { FaqModule } from './faq/faq.module'
import { PodcastsModule } from './podcasts/podcasts.module'
import { RssModule } from './rss/rss.module'
import { TwitterModule } from './twitter/twitter.module'
import { WebsiteModule } from './websites/website.module'
import { YoutubeModule } from './youtube/youtube.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('SRV_USERNAME')}:${configService.get('SRV_PASSWORD')}@${configService.get('SRV_CLUSTER')}.mongodb.net/${configService.get('SRV_BDD')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    AiModule,
    FaqModule,
    PodcastsModule,
    RssModule,
    TwitterModule,
    WebsiteModule,
    YoutubeModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
