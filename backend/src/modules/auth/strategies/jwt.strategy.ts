import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserMode } from 'src/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET || 'jwt',
    });
  }

  async validate(payload: { sub: string; email: string, userMode: UserMode }) {
    return { userId: payload.sub, email: payload.email, userMode: payload.userMode };
  }
}
