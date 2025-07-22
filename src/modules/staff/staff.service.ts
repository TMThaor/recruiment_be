import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStaffDto } from './dtos/createStaff.dto';
import { UpdateStaffDto } from './dtos/updateStaff.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}

  async create(infor: CreateStaffDto) {
    const result = await this.prisma.staff.create({
      data: {
        ...infor,
      },
    });
    return result;
  }

  async getAll() {
    const result = await this.prisma.staff.findMany();
    return result;
  }
  async getById(id: string) {
    const result = await this.prisma.staff.findFirst({ where: { id } });
    return result;
  }

  async update(id: string, infor: UpdateStaffDto) {
    const result = await this.prisma.staff.update({
      where: { id },
      data: infor,
    });
    return result;
  }

  async delete(id: string) {
    const result = await this.prisma.staff.delete({ where: { id } });
    return result;
  }
}
