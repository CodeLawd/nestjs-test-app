import { CampusService } from './campus.service';
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/passport';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Get()
  getUsers() {
    return this.campusService.getUsers();
  }
}
