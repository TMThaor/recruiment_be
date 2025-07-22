import { comparePasswordHelper } from '@/helpers/util';
import { UserService } from '@/modules/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RemovedPasswordUser } from './dto/login.dto';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<RemovedPasswordUser | null> {
    const user = await this.userService.findAccountByUsername(username);
    if (!user) return null;
    const isValidPassword = await comparePasswordHelper(
      password,
      user?.hash ?? '',
    );
    if (!isValidPassword) return null;
    const { hash, ...result } = user;
    return result;
  }
  login(user: RemovedPasswordUser) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  register = (createUserDto: CreateUserDto) => {
    return this.userService.register(createUserDto);
  };
}
