import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyDto } from './dtos/Apply.dto';
import { UpdateAppliedDto } from './dtos/UpdateApplied.dto';
import { MediaService } from '../media/media.service';
import { MailerService } from '@nestjs-modules/mailer';
import { InterviewDto } from './dtos/Interview.dto';
import { OfferDto } from './dtos/Offer.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mediaService: MediaService,
    private readonly mailerService: MailerService,
  ) {}

  async create(infor: ApplyDto, file: Express.Multer.File) {
    const job = await this.prisma.jobs.findUnique({
      where: { id: infor.job_id },
      select: {
        created_at: true,
        expire_at: true,
        title: true,
      },
    });
    const existing = await this.prisma.applications.findFirst({
      where: { job_id: infor.job_id, email: infor.email },
    });
    if (existing != null) {
      throw new BadRequestException('This application already exist');
    }

    if (!job) {
      throw new Error('Job post not found.');
    }

    const now = new Date();

    if (job.expire_at && job.expire_at < now) {
      throw new Error('This job post has expired.');
    }

    if (!job.expire_at) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      if (job.created_at < threeMonthsAgo) {
        throw new Error('This job post is no longer accepting applications.');
      }
    }

    const uploadCv = await this.mediaService.uploadFile(file);

    const result = await this.prisma.applications.create({
      data: {
        ...infor,
        cv: uploadCv?.data?.path,
        dateOfBirth: infor.dateOfBirth
          ? new Date(infor.dateOfBirth)
          : undefined,
        created_at: new Date(),
        updated_at: new Date(),
      },
      include: {
        job: true,
      },
    });

    await this.mailerService.sendMail({
      to: infor.email,
      subject: 'Ứng tuyển thành công',
      template: 'register.hbs',
      context: {
        name: infor.fullname,
        jobTitle: result.job.title,
      },
    });

    return result;
  }

  async getAll() {
    const result = await this.prisma.applications.findMany();
    return result;
  }
  async getById(id: string) {
    const result = await this.prisma.applications.findFirst({ where: { id } });
    return result;
  }
  async update(id: string, infor: UpdateAppliedDto) {
    const result = await this.prisma.applications.update({
      where: { id },
      data: { ...infor, updated_at: new Date() },
    });

    return result;
  }

  async updateStatus(id: string, status: string) {
    const result = await this.prisma.applications.update({
      where: { id },
      data: { status, updated_at: new Date() },
    });
    if (result) {
      await this.mailerService.sendMail({
        to: result.email as string,
        subject: 'Apply successfully',
        template: 'register.hbs',
        context: {
          name: result.fullname,
          jobTitle: result.status,
        },
      });
    }
    return result;
  }
  async delete(id: string) {
    const result = await this.prisma.applications.delete({ where: { id } });
    await this.mediaService.deleteById(result.cv);
    return result;
  }
  async countAll() {
    const result = await this.prisma.applications.count();
    return result;
  }
  async interview(id: string, schedule: InterviewDto) {
    const result = await this.prisma.applications.update({
      where: { id },
      data: {
        interviewDate: schedule.date ? new Date(schedule.date) : undefined,
        interviewTime: schedule.time,
        interviewType: schedule.type,
        interviewer: schedule.interviewer,
        location: schedule.location,
        status: 'interview',
        updated_at: new Date(),
      },
      include: { job: true },
    });
    await this.mailerService.sendMail({
      to: result.email as string,
      subject: 'Thư mời phỏng vấn',
      template: 'interview.hbs',
      context: {
        fullname: result.fullname,
        jobTitle: result.job.title,
        Date: schedule.date,
        Time: schedule.time,
        Location: schedule.location,
        InterviewType: schedule.type,
        Interviewer: schedule.interviewer,
      },
    });
    return result;
  }
  async offer(id: string, offer: OfferDto) {
    const result = await this.prisma.applications.update({
      where: { id },
      data: {
        offerSalary: offer.salary,
        expectDate: offer.startDate ? new Date(offer.startDate) : undefined,
        workLocation: offer.workLocation,
        status: 'offered',
        updated_at: new Date(),
      },
      include: { job: true },
    });
    await this.mailerService.sendMail({
      to: result.email as string,
      subject: 'Thư mời nhận việc',
      template: 'offer.hbs',
      context: {
        fullname: result.fullname,
        jobTitle: result.job.title,
        Salary: offer.salary,
        StartDate: offer.startDate,
        WorkLocation: offer.workLocation,
      },
    });
    return result;
  }

  async hire(id: string) {
    const result = await this.prisma.applications.update({
      where: { id },
      data: { status: 'hired', updated_at: new Date() },
      include: { job: true },
    });
    await this.mailerService.sendMail({
      to: result.email as string,
      subject: 'Thư xác nhận trúng tuyển',
      template: 'hire.hbs',
      context: {
        fullname: result.fullname,
        jobTitle: result.job.title,
      },
    });
    return result;
  }
  async reject(id: string) {
    const result = await this.prisma.applications.update({
      where: { id },
      data: { status: 'rejected', updated_at: new Date() },
      include: { job: true },
    });
    await this.mailerService.sendMail({
      to: result.email as string,
      subject: 'Thông báo kết quả ứng tuyển',
      template: 'reject.hbs',
      context: {
        fullname: result.fullname,
        jobTitle: result.job.title,
      },
    });
    return result;
  }
}
