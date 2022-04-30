import { Interface } from 'readline';

export interface Item {
  id: String;
  name: String;
  price: number;
  description: String;
  status: ItemStatus;
}

export enum ItemStatus {
  ON_SALE = 'ON_SALE',
  SOLD_OUT = 'SOLD_OUT',
}
