import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/passport';
import { RolesGuard } from 'src/common/roles';
import { User, UserRepository, UserSchema } from 'src/entity';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';
import { UserModule } from './user/user.module';

@Module({
  controllers: [CampusController],
  providers: [
    CampusService,
    UserRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
  ],
})
export class CampusModule {}
