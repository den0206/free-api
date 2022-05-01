import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepositry } from './auth.repositry';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CredentialDto } from './dto/credentials.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepositry: UserRepositry,
    private jwt: JwtService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepositry.createUser(dto);
  }

  async signIn(credentialDto: CredentialDto): Promise<{ token: string }> {
    const { email, password } = credentialDto;
    const user = await this.userRepositry.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id, email: user.email };
      const token = await this.jwt.sign(payload);
      return { token };
    }

    throw new UnauthorizedException(
      'ユーザー名またはパスワードを確認してください',
    );
  }
}
