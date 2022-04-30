import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from 'src/entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemStatus } from './item.model';
// import { v4 as uuid } from 'uuid';
import { ItemRepositry } from './item.repositry';

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepositry: ItemRepositry) {}
  private items: Item[] = [];

  async findAll(): Promise<Item[]> {
    return await this.itemRepositry.find();
  }

  async findById(id: String): Promise<Item> {
    const item = await this.itemRepositry.findOne({ id });

    if (!item) {
      throw new NotFoundException();
    }

    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepositry.createItem(createItemDto);
  }

  async updateStatus(id: String): Promise<Item> {
    const item = await this.findById(id);
    item.status = ItemStatus.SOLD_OUT;
    item.updateAt = new Date().toISOString();
    await this.itemRepositry.save(item);
    return item;
  }

  async delete(id: String) {
    const result = await this.itemRepositry.delete({ id });
    return result;
  }
}
