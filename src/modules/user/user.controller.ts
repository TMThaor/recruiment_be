import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { Public } from '@/decorator/customize_decorator';
import { Roles } from '@/decorator/customize_decorator';
import { CreateAdminAccountDto } from './dto/create-admin-account.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('admin-account')
  async getAllAdminAccount() {
    const result = await this.userService.getAllAdminAccount();
    return result;
  }

  @Public()
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createCandidateAccount(createUserDto);
  }

  @Get(':id')
  async findCandidateById(@Param('id') id: string) {
    const result = await this.userService.findCandidateById(id);
    return result;
  }

  @UseGuards()
  @Get()
  findAll(
    @Query() query: string,
    @Query('skip') skip: string,
    @Query('take') take: string,
  ) {
    return this.userService.findAll(query, +skip, +take);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post('create-admin-account')
  async createAdminAccount(
    @Body() createAdminAccountDto: CreateAdminAccountDto,
  ) {
    const result = await this.userService.createAdminAccount(
      createAdminAccountDto,
    );
    return result;
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.removeA(id);
  // }
}
