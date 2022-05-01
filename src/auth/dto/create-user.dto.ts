import { UserStatus } from '../user-status.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator/types/decorator/decorators';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
