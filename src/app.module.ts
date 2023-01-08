import { Module } from '@nestjs/common';
import { CampusModule } from './campus/campus.module';
import { HqModule } from './hq/hq.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { SyncModule } from './sync/sync.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    EventEmitterModule.forRoot(),
    CampusModule,
    HqModule,
    AuthModule,
    CoursesModule,
    SyncModule,
  ],
})
export class AppModule {}
