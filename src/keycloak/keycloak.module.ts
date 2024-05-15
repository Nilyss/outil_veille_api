import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect'
import { APP_GUARD } from '@nestjs/core'

const configService: ConfigService = new ConfigService()

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakConnectModule.register({
      authServerUrl: configService.get('KEYCLOAK_AUTHORIZATION_SERVER_URL'),
      realm: configService.get('KEYCLOAK_REALM'),
      clientId: configService.get('KEYCLOAK_CLIENT_ID'),
      secret: configService.get('KEYCLOAK_SECRET'),
    }),
  ],
  controllers: [],
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
export class KeycloakModule {}
