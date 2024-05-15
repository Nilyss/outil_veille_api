import { Module } from '@nestjs/common'
import { YoutubeController } from './youtube.controller'
import { YoutubeService } from './youtube.service'
import { youtubeProvider } from './youtube.provider'
import { DatabaseModule } from '../database/database.module'
import { KeycloakModule } from '../keycloak/keycloak.module'

@Module({
  imports: [DatabaseModule, KeycloakModule],
  controllers: [YoutubeController],
  providers: [YoutubeService, ...youtubeProvider],
})
export class YoutubeModule {}
