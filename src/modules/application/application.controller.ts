import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Public, Roles } from '@/decorator/customize_decorator';
import { ApplicationService } from './application.service';
import { ApplyDto } from './dtos/Apply.dto';
import { UpdateAppliedDto } from './dtos/UpdateApplied.dto';
import { InterviewDto } from './dtos/Interview.dto';
import { OfferDto } from './dtos/Offer.dto';
import { RolesGuard } from '@/auth/passport/roles.guard';

@Controller('application')
export class ApplicationController {
  constructor(private readonly service: ApplicationService) {}
  @Public()
  @Get()
  async getAllApplication() {
    const result = await this.service.getAll();
    return result;
  }

  @Public()
  @Get('/:id')
  async getApplicationById(@Param('id') id: string) {
    const job = await this.service.getById(id);
    return job;
  }

  // @Public()
  // @Put('update-status/:id')
  // async updateStatus(@Param('id') id: string, @Body() status) {
  //   const result = await this.updateStatus(id, status);
  //   return result;
  // }
  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async createApplication(
    @Body() infor: ApplyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const result = await this.service.create(infor, file);
      return result;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('update-status/:id')
  async updateApplication(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    const result = await this.service.updateStatus(id, body.status);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteApplication(@Param('id') id: string) {
    const result = await this.service.delete(id);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('count')
  async countAllApplicant() {
    const result = await this.service.countAll();
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('interview/:id')
  async inviteInterview(
    @Param('id') id: string,
    @Body() schedule: InterviewDto,
  ) {
    const result = await this.service.interview(id, schedule);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('send-offer/:id')
  async SendOffer(@Param('id') id: string, @Body() offer: OfferDto) {
    const result = await this.service.offer(id, offer);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('hire/:id')
  async hireCandidate(@Param('id') id: string) {
    const result = await this.service.hire(id);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('reject/:id')
  async rejectCandidate(@Param('id') id: string) {
    const result = await this.service.reject(id);
    return result;
  }
}
