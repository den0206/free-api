import { ItemStatus } from 'src/items/item.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  name: String;

  @Column()
  price: number;

  @Column()
  description: String;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: String;

  @Column()
  updateAt: String;
}
