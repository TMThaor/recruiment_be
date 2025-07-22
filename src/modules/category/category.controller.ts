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
import { CategoryService } from './category.service';
import { Public, Roles } from '@/decorator/customize_decorator';
import { RolesGuard } from '@/auth/passport/roles.guard';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { UpdateCategoryDto } from './dtos/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get()
  async getAllCategory() {
    const result = await this.categoryService.getAll();
    return result;
  }

  @Public()
  @Get('/:id')
  async getCategoryById(@Param('id') id: string) {
    const result = await this.categoryService.getById(id);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Post()
  async createCategory(@Body() category: CreateCategoryDto) {
    const result = await this.categoryService.create(category);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  // @Public()
  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    const result = await this.categoryService.update(id, category);
    return result;
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Delete('/:id')
  async deleteJobPost(@Param('id') id: string) {
    const result = await this.categoryService.delete(id);
    return result;
  }
}
