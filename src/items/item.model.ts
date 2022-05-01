import { Interface } from 'readline';

export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  status: ItemStatus;
}

export enum ItemStatus {
  ON_SALE = 'ON_SALE',
  SOLD_OUT = 'SOLD_OUT',
}
