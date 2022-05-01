import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepositry } from './auth.repositry';
import { User } from '../entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepositry: UserRepositry) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '',
    });
  }

  async validate(payload: { id: string; email: string }): Promise<User> {
    const { id, email } = payload;
    const user = await this.userRepositry.findOne({ id, email });

    if (user) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
