import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { Public, Roles } from '@/decorator/customize_decorator';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { CreateStaffDto } from './dtos/createStaff.dto';
import { UpdateStaffDto } from './dtos/updateStaff.dto';

@Controller('staff')
export class StaffController {
  constructor(private readonly service: StaffService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  async getAllStaff() {
    const result = await this.service.getAll();
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/:id')
  async getStaffById(@Param('id') id: string) {
    const job = await this.service.getById(id);
    return job;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  async createStaff(@Body() infor: CreateStaffDto) {
    const result = await this.service.create(infor);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateStaff(@Param('id') id: string, @Body() infor: UpdateStaffDto) {
    const result = await this.service.update(id, infor);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteStaff(@Param('id') id: string) {
    const result = await this.service.delete(id);
    return result;
  }
}
