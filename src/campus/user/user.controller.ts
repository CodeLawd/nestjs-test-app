import { UserService } from './user.service';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':userId')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Param('userId') userId: string,
  ) {
    return this.userService.updateProfile(userId, updateUserDto);
  }
}
