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
import { CandidateService } from './candidate.service';
import { Public, Roles } from '@/decorator/customize_decorator';
import { CreateCandidateDto } from './dtos/createCandidate.dto';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { UpdateCandidateDto } from './dtos/updateCandidate.dto';

@Controller('candidate')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  async getAllCandidate() {
    const result = await this.candidateService.getAll();
    return result;
  }

  @Get('/:id')
  async getCandidateById(@Param('id') id: string) {
    const job = await this.candidateService.getById(id);
    return job;
  }

  @Public()
  @Post()
  async createCandidate(@Body() candidateInfor: CreateCandidateDto) {
    const result = await this.candidateService.create(candidateInfor);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Patch('/:id')
  async updateCandidate(
    @Param('id') id: string,
    @Body() candidateInfor: UpdateCandidateDto,
  ) {
    const result = await this.candidateService.update(id, candidateInfor);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteCandidate(@Param('id') id: string) {
    const result = await this.candidateService.delete(id);
    return result;
  }

  @Get('/jobs/:id')
  async getAppliedJobs(@Param('id') id: string) {
    const result = await this.candidateService.getJobsAppliedByCandidate(id);
    return result;
  }
}
