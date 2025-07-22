import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
import { promises as fs } from 'fs';
import { Media } from '@/interfaces/media.type';

@Injectable()
export class MediaService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File) {
    // create unique file name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split('.').pop();
    const filename = `${file.originalname.split('.')[0]}-${uniqueSuffix}.${ext}`;
    const uploadPath = join(process.cwd(), 'uploads', 'cv', filename);

    const media = new Media();
    media.name = file.originalname;
    media.type = file.mimetype;
    media.path = `/uploads/cv/${filename}`;
    media.created_at = new Date() as unknown as string;

    try {
      // Create a record in media table
      const savedMedia = await this.prisma.media.create({ data: media });

      // Ensure that the uploads/media directory exists
      const uploadDir = join(process.cwd(), 'uploads', 'cv');
      await fs.mkdir(uploadDir, { recursive: true });

      // Write the file to disk only if saving to the database is successful
      await fs.writeFile(uploadPath, file.buffer);

      return { done: true, data: savedMedia };
    } catch (err) {
      // Throw an exception if saving to the database is fail
      console.error(err);
      throw new InternalServerErrorException(
        `Failed to save media to database: ${err}`,
      );
    }
  }

  async getAll() {
    try {
      const result = await this.prisma.media.findMany();
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getById(id: string) {
    try {
      const result = await this.prisma.media.findFirst({ where: { id } });
      return {
        done: true,
        data: result,
      };
    } catch (err) {
      console.error(err);
    }
  }
  async deleteById(id: string) {
    try {
      const result = await this.prisma.media.delete({ where: { id } });
      await fs.unlink(`${process.cwd()}/${result.path}`);
      return { done: true, data: result };
    } catch (err) {
      console.error(err);
    }
  }
}
