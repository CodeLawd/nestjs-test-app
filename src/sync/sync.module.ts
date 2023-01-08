import { EmailModule } from './email/email.module';
import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';

@Module({
  imports: [EmailModule],
  controllers: [SyncController],
  providers: [SyncService],
})
export class SyncModule {}
