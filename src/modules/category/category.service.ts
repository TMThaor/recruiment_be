import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(category: CreateCategoryDto) {
    const newCategory = await this.prisma.category.create({
      data: {
        ...category,
        created_at: new Date(),
      },
    });
    return newCategory;
  }

  async getAll() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
  async getById(id: string) {
    const category = await this.prisma.category.findFirst({ where: { id } });
    return category;
  }

  async update(id: string, category: UpdateCategoryDto) {
    const updatedJob = await this.prisma.category.update({
      where: { id },
      data: category,
    });
    return updatedJob;
  }

  async delete(id: string) {
    const deletedCategory = await this.prisma.category.delete({
      where: { id },
    });
    return deletedCategory;
  }
}
