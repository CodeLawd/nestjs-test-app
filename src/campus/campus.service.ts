import { UserRepository } from './../entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CampusService {
  constructor(private userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.find({});
  }
}
