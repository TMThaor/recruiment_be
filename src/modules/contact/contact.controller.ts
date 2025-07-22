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
import { ContactService } from './contact.service';
import { Public, Roles } from '@/decorator/customize_decorator';
import { ContactDto } from './dtos/Contact.dto';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { UpdateContactDto } from './dtos/UpdateContact.dto';
import { ReplyDto } from './dtos/Reply.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  async getAllContact() {
    const result = await this.service.getAll();
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/:id')
  async getContactById(@Param('id') id: string) {
    const job = await this.service.getById(id);
    return job;
  }

  @Public()
  //   @UseGuards(RolesGuard)
  //   @Roles('admin')
  @Post('/recruitment')
  async createRecruitmentContact(@Body() infor: ContactDto) {
    const result = await this.service.create(infor);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() infor: UpdateContactDto,
  ) {
    const result = await this.service.update(id, infor);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteContact(@Param('id') id: string) {
    const result = await this.service.delete(id);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/reply/:id')
  async replyContact(@Param('id') id: string, @Body() info: ReplyDto) {
    const result = await this.service.reply(id, info);
    return result;
  }
}
