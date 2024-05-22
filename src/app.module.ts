import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AiModule } from './ai/ai.module'
import { FaqModule } from './faq/faq.module'
import { PodcastsModule } from './podcasts/podcasts.module'
import { RssModule } from './rss/rss.module'
import { TwitterModule } from './twitter/twitter.module'
import { WebsiteModule } from './websites/website.module'
import { YoutubeModule } from './youtube/youtube.module'
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        authServerUrl: configService.get<string>(
          'KEYCLOAK_AUTHORIZATION_SERVER_URL',
        ),
        realm: configService.get<string>('KEYCLOAK_REALM'),
        clientId: configService.get<string>('KEYCLOAK_CLIENTID'),
        secret: configService.get<string>('KEYCLOACK_SECRET'),
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
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
