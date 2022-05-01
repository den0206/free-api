import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflactor: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const reqStatus = this.reflactor.get<String[]>(
      'statues',
      context.getHandler(),
    );

    if (!reqStatus) {
      return true;
    }

    const user: User = context.switchToHttp().getRequest();
    return reqStatus.some((stat) => user.status.includes(stat.toString()));
  }
}
