import { SetMetadata } from '@nestjs/common';

export const Role = (...statues: string[]) => SetMetadata('statues', statues);
