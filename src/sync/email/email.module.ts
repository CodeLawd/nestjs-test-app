import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';

@Module({
  providers: [EmailController],
})
export class EmailModule {}
