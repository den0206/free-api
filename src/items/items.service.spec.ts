import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ItemRepositry } from './item.repositry';
import { UserStatus } from '../auth/user-status.enum';
import { ItemStatus } from './item.model';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { async } from 'rxjs';
import { User } from '../entities/user.entity';

const mockItemRepositry = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createItem: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser1: User = {
  id: '1',
  email: 'test1',
  password: 'pass',
  status: UserStatus.PREMIUM,
  items: [],
};

const mockUser2 = {
  id: '2',
  email: 'test2',
  password: 'pass',
  status: UserStatus.FREE,
  items: [],
};

describe('ItemsServiceTest', () => {
  let itemsService: ItemsService;
  let itemRepositry;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: ItemRepositry, useFactory: mockItemRepositry },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    itemRepositry = module.get<ItemRepositry>(ItemRepositry);
  });

  describe('findAll', () => {
    it('正常系', async () => {
      const expected = [];
      itemRepositry.find.mockResolvedValue(expected);
      const result = await itemsService.findAll();

      expect(result).toEqual(expected);
    });
  });

  describe('findById', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };

      itemRepositry.findOne.mockResolvedValue(expected);
      const result = await itemsService.findById('test-id');
      expect(result).toEqual(expected);
    });

    it('異常系', async () => {
      itemRepositry.findOne.mockResolvedValue(null);
      await expect(itemsService.findById('test-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('正常系', async () => {
      const expected = {
        id: 'test-id',
        name: 'PC',
        price: 50000,
        status: ItemStatus.ON_SALE,
        createdAt: '',
        updatedAt: '',
        userId: mockUser1.id,
        user: mockUser1,
      };

      itemRepositry.createItem.mockResolvedValue(expected);
      const result = await itemsService.create(
        {
          name: 'PC',
          price: 50000,
          description: '',
        },
        mockUser1,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('update status', () => {
    const mockItem = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };

    it('正常系', async () => {
      itemRepositry.findOne.mockResolvedValue(mockItem);
      await itemsService.updateStatus('test-id', mockUser2);
      expect(itemRepositry.save).toHaveBeenCalled();
    });

    it('異常系', async () => {
      itemRepositry.findOne.mockResolvedValue(mockItem);
      await expect(
        itemsService.updateStatus('test-id', mockUser1),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('delete', () => {
    const mockItem = {
      id: 'test-id',
      name: 'PC',
      price: 50000,
      status: ItemStatus.ON_SALE,
      createdAt: '',
      updatedAt: '',
      userId: mockUser1.id,
      user: mockUser1,
    };

    it('正常系', async () => {
      itemRepositry.findOne.mockResolvedValue(mockItem);
      await itemsService.delete('test-id', mockUser1);
      expect(itemRepositry.delete).toHaveBeenCalled();
    });

    it('異常系', async () => {
      itemRepositry.findOne.mockResolvedValue(mockItem);
      await expect(itemsService.delete('test-id', mockUser2)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
