import { UserRepository } from './../entity/users.repository';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SyncController],
  providers: [SyncService, UserRepository],
})
export class SyncModule {}
