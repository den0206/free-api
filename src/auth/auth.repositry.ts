import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepositry extends Repository<User> {
  async createUser(dto: CreateUserDto): Promise<User> {
    const { email, password, status } = dto;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const user = this.create({
      email,
      password: hashed,
      status,
    });

    await this.save(user);
    return user;
  }
}
