import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dtos/createJob.dto';
import { UpdateJobDto } from './dtos/updateJob.dto';

@Injectable()
export class JobService {
  constructor(private readonly prisma: PrismaService) {}

  async create(jobInfor: CreateJobDto) {
    const newJob = await this.prisma.jobs.create({
      data: {
        ...jobInfor,
        expire_at: jobInfor.expire_at
          ? new Date(jobInfor.expire_at)
          : undefined,
      },
      include: { category: true },
    });
    return newJob;
  }

  async getAll() {
    const jobs = await this.prisma.jobs.findMany({
      include: { category: true },
    });
    return jobs;
  }
  async getById(id: string) {
    const job = await this.prisma.jobs.findFirst({ where: { id } });
    return job;
  }

  async update(id: string, jobInfor: UpdateJobDto) {
    const { expire_at, ...rest } = jobInfor;

    const updatedJob = await this.prisma.jobs.update({
      where: { id },
      data: {
        ...rest,
        expire_at: expire_at ? new Date(expire_at) : null,
      },
      include: { category: true },
    });

    return updatedJob;
  }

  async delete(id: string) {
    const deletedJob = await this.prisma.jobs.delete({ where: { id } });
    return deletedJob;
  }

  async getCandidateByJobId(id: string) {
    const job = await this.prisma.jobs.findFirst({
      where: { id: id },
      include: {
        applications: true,
        // {
        //   include: {
        //     candidate: true,
        //   },
        // },
      },
    });
    return job;
  }
}
