import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Public, Roles } from '@/decorator/customize_decorator';
import { RolesGuard } from '@/auth/passport/roles.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      //filter file type
      fileFilter: (req, file, callback) => {
        // if (!file.mimetype.match(/image\/(jpg|jpeg|png|gif)$/)) {
        //   return callback(
        //     new BadRequestException('Only image files are allowed!'),
        //     false,
        //   );
        // }
        callback(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const res = await this.mediaService.uploadFile(file);
    const media = res?.data;
    return {
      id: media?.id,
      name: media?.name,
      type: media?.type,
      path: media?.path,
      created_at: media?.created_at,
    };
  }

  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  async getAll() {
    const result = await this.mediaService.getAll();
    return result;
  }

  @Public()
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const result = await this.mediaService.getById(id);
    return result;
  }

  @Public()
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    const result = await this.mediaService.deleteById(id);
    return result;
  }
}
