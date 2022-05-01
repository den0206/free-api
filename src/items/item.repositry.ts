import { NotFoundException } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item.model';

@EntityRepository(Item)
export class ItemRepositry extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto, user: User): Promise<Item> {
    const { name, price, description } = createItemDto;
    const item = this.create({
      name,
      price,
      description,
      status: ItemStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
      user,
    });

    await this.save(item);
    return item;
  }
}
