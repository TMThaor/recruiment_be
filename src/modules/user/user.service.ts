import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPasswordHelper } from '@/helpers/util';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { v4 as uuidv4 } from 'uuid';
import { addMinutes, isValid, parse } from 'date-fns';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateAdminAccountDto } from './dto/create-admin-account.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}
  async createCandidateAccount(createUserDto: CreateUserDto) {
    try {
      const {
        username,
        fullname,
        email,
        hash,
        phoneNumber,
        dateOfBirth,
        education,
      } = createUserDto;

      let parsedDateOfBirth: string | null = null;
      if (dateOfBirth) {
        const parsedDate = parse(dateOfBirth, 'dd-MM-yyyy', new Date());
        if (!isValid(parsedDate)) {
          throw new BadRequestException(
            'dateOfBirth has an invalid format. Please use the format dd-MM-yyyy (e.g., 11-05-2003).',
          );
        }
        parsedDateOfBirth = parsedDate.toISOString();
      }

      const hashPassword = await hashPasswordHelper(hash ?? '');
      const account = await this.prisma.account.create({
        data: {
          username,
          hash: hashPassword ?? '',
          role: 'candidate',
        },
      });

      const candidate = await this.prisma.candidate.create({
        data: {
          account_id: account.id,
          fullname,
          email,
          phoneNumber,
          dateOfBirth: parsedDateOfBirth,
          education,
        },
      });

      return {
        success: true,
        error: 'OK',
        errorCode: 0,
        content: {
          ...candidate,
          role: account.role,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Username or email already exists.');
        }
      }
      throw new BadRequestException(
        `Something went wrong.Please try again: ${error.message}`,
      );
    }
  }

  async findAll(query: string, skip: number, take: number) {
    skip = skip !== undefined ? skip : 0;
    take = take || 10;
    const result = await this.prisma.account.findMany({
      skip,
      take,
    });
    const filteredResult = result.map(({ hash, ...user }) => user);
    return filteredResult;
  }

  async findAccountByUsername(username: string) {
    const account = await this.prisma.account.findFirst({
      where: { username },
    });

    return account;
  }

  async findCandidateById(id: string) {
    const candidate = await this.prisma.candidate.findFirst({
      where: { account_id: id },
    });
    return candidate;
  }

  async update(id: string, updateCandidateAccountDto: UpdateUserDto) {
    const updatedUser = await this.prisma.candidate.update({
      where: {
        id,
      },
      data: {
        fullname: updateCandidateAccountDto.fullname,
        email: updateCandidateAccountDto.email,
        phoneNumber: updateCandidateAccountDto.phoneNumber,
        dateOfBirth: updateCandidateAccountDto.dateOfBirth,
        education: updateCandidateAccountDto.education,
      },
    });

    return updatedUser;
  }

  async removeAdministrator(id: string) {
    try {
      const admin = await this.prisma.admin.delete({
        where: { id },
      });
      const user = await this.prisma.account.delete({
        where: { id: admin.account_id },
      });

      return {
        success: true,
        message: 'User deleted successfully',
        content: { username: user.username, ...admin },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException(`User with id ${id} not found`);
        }
      }
      throw new BadRequestException(
        'An error occurred while deleting the user',
      );
    }
  }

  register = async (createUserDto: CreateUserDto) => {
    try {
      const {
        username,
        role,
        fullname,
        email,
        hash,
        phoneNumber,
        dateOfBirth,
        education,
      } = createUserDto;

      const hashPassword = await hashPasswordHelper(hash ?? '');
      const user = await this.prisma.account.create({
        data: {
          username,
          hash: hashPassword ?? '',
          role,
        },
      });

      const candidate = await this.prisma.candidate.create({
        data: {
          account_id: user.id,
          fullname: fullname ?? null,
          email: email ?? null,
          phoneNumber: phoneNumber ?? null,
          dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
          education: education ?? null,
        },
      });

      const { hash: removeHash, ...content } = user;
      return {
        success: true,
        error: 'OK',
        errorCode: 0,
        content: {
          ...content,
          ...candidate,
        },
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Username or email already exists.');
        }
      }
      throw new BadRequestException(`Has an error occur: ${error.message}`);
    }
  };
  async createAdminAccount(createAdminAccoutnDto: CreateAdminAccountDto) {
    try {
      const { username, fullname, email, hash } = createAdminAccoutnDto;

      const hashPassword = await hashPasswordHelper(hash ?? '');
      const account = await this.prisma.account.create({
        data: {
          username,
          hash: hashPassword ?? '',
          role: 'admin',
        },
      });

      const adminInfor = await this.prisma.admin.create({
        data: {
          account_id: account.id,
          fullname,
          email,
        },
      });

      return {
        success: true,
        error: 'OK',
        errorCode: 0,
        content: {
          ...adminInfor,
          role: account.role,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Username or email already exists.');
        }
      }
      throw new BadRequestException(`Has an error occur: ${error.message}`);
    }
  }

  async getAllAdminAccount() {
    const accounts = await this.prisma.account.findMany({
      where: { role: 'admin' },
      include: {
        admin: true,
      },
    });
    const result = accounts.map(({ hash, ...account }) => account);
    return result;
  }
}
