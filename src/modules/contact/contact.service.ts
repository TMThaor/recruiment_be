import { ReplyDto } from './dtos/Reply.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContactDto } from './dtos/Contact.dto';
import { UpdateContactDto } from './dtos/UpdateContact.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async create(infor: ContactDto) {
    const result = await this.prisma.contacts.create({
      data: {
        ...infor,
        created_at: new Date(),
      },
    });
    return result;
  }

  async getAll() {
    const result = await this.prisma.contacts.findMany();
    return result;
  }
  async getById(id: string) {
    const result = await this.prisma.contacts.findFirst({ where: { id } });
    return result;
  }

  async update(id: string, infor: UpdateContactDto) {
    const result = await this.prisma.contacts.update({
      where: { id },
      data: infor,
    });
    return result;
  }

  async delete(id: string) {
    const result = await this.prisma.contacts.delete({ where: { id } });
    return result;
  }

  async reply(id: string, reply: ReplyDto) {
    const result = await this.prisma.contacts.update({
      where: { id },
      data: {
        isReplied: true,
      },
    });
    await this.mailerService.sendMail({
      to: result.email,
      subject: 'Thư phản hồi thắc mắc',
      template: 'replyContact.hbs',
      context: {
        fullname: result.fullName,
        Question: result.message,
        Answer: reply.answer,
      },
    });
    return result;
  }
}
