import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Hq')
@Controller('hq')
export class HqController {}
