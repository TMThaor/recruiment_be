import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: number;
  username: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('SECRET_KEY') || 'defaultSecret',
    });
  }

  // Fix lỗi any bằng cách thêm kiểu JwtPayload
  async validate(
    payload: JwtPayload,
  ): Promise<{ userId: number; username: string; role: string }> {
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
