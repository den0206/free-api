import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CredentialDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  async SignUp(@Body() dto: CreateUserDto): Promise<User> {
    return await this.service.create(dto);
  }

  @Post()
  async signIn(@Body() dto: CredentialDto): Promise<{ token: string }> {
    return await this.service.signIn(dto);
  }
}
