import { Module } from '@nestjs/common'
import { AiController } from './ai.controller'
import { AiService } from './ai.service'
import { aiProvider } from './ai.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [AiController],
  providers: [AiService, ...aiProvider],
})
export class AiModule {}
