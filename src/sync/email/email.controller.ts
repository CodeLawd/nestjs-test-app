import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Controller()
export class EmailController {
  @OnEvent('user_created')
  handleUserCreated(data: any) {
    console.log('A new user was created....');
    console.log(data);
  }

  // User updated
  @OnEvent('user_profile_updated')
  handleUserUpdated(data: any) {
    console.log(`Hi ${data.firstName}, your profile was updated successfully`);
  }
}
