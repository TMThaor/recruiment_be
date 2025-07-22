import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Public, Roles } from '@/decorator/customize_decorator';
import { CreateJobDto } from './dtos/createJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';
import { RolesGuard } from '@/auth/passport/roles.guard';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Public()
  @Get()
  async getAllJob() {
    const jobs = await this.jobService.getAll();
    return jobs;
  }

  @Public()
  @Get('/:id')
  async getJobById(@Param('id') id: string) {
    const job = await this.jobService.getById(id);
    return job;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  async createJobPost(@Body() jobInfor: CreateJobDto) {
    const job = await this.jobService.create(jobInfor);
    return job;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateJobPost(@Param('id') id: string, @Body() jobInfor: UpdateJobDto) {
    const job = await this.jobService.update(id, jobInfor);
    return job;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteJobPost(@Param('id') id: string) {
    const job = await this.jobService.delete(id);
    return job;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get('/candidate/:id')
  async getCandidateByJob(@Param('id') id: string) {
    const job = await this.jobService.getCandidateByJobId(id);
    return job;
  }
}
