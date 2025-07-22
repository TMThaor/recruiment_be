import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Request as Req } from 'express';
import { RemovedPasswordUser } from './dto/login.dto';
import { Public } from '@/decorator/customize_decorator';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '@/modules/user/user.service';

interface AuthRequest extends Req {
  user: RemovedPasswordUser;
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req: AuthRequest) {
    const user = req.user as { id: string; role: string };
    return this.userService.findCandidateById(user.id);
  }

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Get('mail')
  async testSendEmail() {
    await this.mailerService.sendMail({
      to: 'thaotrieu6@gmail.com',
      subject: 'Testing Nest MailerModule',
      text: 'welcome',
      template: 'register.hbs',
      context: {
        name: 'Thao',
        jobTitle: 123456,
      },
    });
    return { error: 'OK' };
  }
}
