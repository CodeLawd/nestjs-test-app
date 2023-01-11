import { SyncService } from './sync.service';
import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}
  // Handle user created
  @OnEvent('user.created')
  async handleUserCreated(data: any) {
    return await this.syncService.handleUserCreated(data);
  }

  // Handle user login
  @OnEvent('user.login')
  handleUserLogin(data: any) {
    return this.syncService.handleUserLogin();
  }

  // Handle user verfied
  @OnEvent('user.verified')
  handleUserVerified(data: any) {
    return this.syncService.handleUserVerified(data);
  }

  // Handle user updated
  @OnEvent('user.updated')
  handleUserUpdated(data: any) {
    return this.syncService.handleUserUpdated();
  }

  // Handle user updated
  @OnEvent('resend.otp')
  handleResendOtp(data: any) {
    return this.syncService.handleResendOtp(data);
  }
}
