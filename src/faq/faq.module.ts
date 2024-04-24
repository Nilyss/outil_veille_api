import { Module } from '@nestjs/common'
import { FaqController } from './faq.controller'
import { FaqService } from './faq.service'
import { faqProvider } from './faq.provider'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [FaqController],
  providers: [FaqService, ...faqProvider],
})
export class FaqModule {}
