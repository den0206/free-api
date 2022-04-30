import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepositry } from './item.repositry';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemRepositry])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
