import { EventEmitter2 } from '@nestjs/event-emitter';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './../../entity/users.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
    );
    if (!user)
      throw new NotFoundException(`User with id of ${userId} not found`);

    // Emit update event
    this.eventEmitter.emit('user_profile_updated', user);

    return user;
  }
}
