import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCandidateDto } from './dtos/createCandidate.dto';
import { UpdateCandidateDto } from './dtos/updateCandidate.dto';

@Injectable()
export class CandidateService {
  constructor(private readonly prisma: PrismaService) {}

  async create(candidateInfo: CreateCandidateDto) {
    const result = await this.prisma.candidate.create({
      data: {
        ...candidateInfo,
      },
    });
    return result;
  }

  async getAll() {
    const result = await this.prisma.candidate.findMany();
    return result;
  }
  async getById(id: string) {
    const result = await this.prisma.candidate.findFirst({ where: { id } });
    return result;
  }

  async update(id: string, candidateInfor: UpdateCandidateDto) {
    const result = await this.prisma.candidate.update({
      where: { id },
      data: candidateInfor,
    });
    return result;
  }

  async delete(id: string) {
    const result = await this.prisma.candidate.delete({ where: { id } });
    return result;
  }

  async getJobsAppliedByCandidate(id: string) {
    const result = await this.prisma.applications.findMany({
      where: { candidate_id: id },
      include: {
        job: {
          include: {
            category: true,
          },
        },
      },
    });
    return result;
  }
}
