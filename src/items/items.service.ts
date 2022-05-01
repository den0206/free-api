import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { User } from 'src/entities/user.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item.model';
// import { v4 as uuid } from 'uuid';
import { ItemRepositry } from './item.repositry';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepositry: ItemRepositry) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepositry.find();
  }

  async findById(id: string): Promise<Item> {
    const item = await this.itemRepositry.findOne({ id });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async create(createItemDto: CreateItemDto, user: User): Promise<Item> {
    return await this.itemRepositry.createItem(createItemDto, user);
  }

  async updateStatus(id: string, user: User): Promise<Item> {
    const item = await this.findById(id);

    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません');
    }
    item.status = ItemStatus.SOLD_OUT;
    item.updateAt = new Date().toISOString();
    await this.itemRepositry.save(item);
    return item;
  }

  async delete(id: string, user: User) {
    const item = await this.findById(id);

    if (item.userId !== user.id) {
      throw new BadRequestException('この商品はあなたから削除できません');
    }

    const result = await this.itemRepositry.delete({ id });
    return result;
  }
}
