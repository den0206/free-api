import { NotFoundException } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item.model';

@EntityRepository(Item)
export class ItemRepositry extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto): Promise<Item> {
    const { name, price, description } = createItemDto;
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    });

    await this.save(item);
    return item;
  }
}