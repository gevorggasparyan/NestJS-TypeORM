import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [{ id: 1, name: 'Test User', age: 30, email: 'test@example.com' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedUsers);
      const users = await controller.findAll();
      expect(users).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = { id: 1, name: 'Test User', age: 30, email: 'test@example.com' };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedUser);
      const user = await controller.findOne(1);
      expect(user).toEqual(expectedUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = { name: 'Test User', age: 30, email: 'test@example.com' };
      jest.spyOn(service, 'create').mockResolvedValue({ id: 1, ...user });
      const newUser = await controller.create(user as User);
      expect(newUser).toEqual({ id: 1, ...user });
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const user = { name: 'Updated User', age: 31, email: 'updated@example.com' };
      jest.spyOn(service, 'update').mockResolvedValue({ id: 1, ...user });
      const updatedUser = await controller.update(1, user as User);
      expect(updatedUser).toEqual({ id: 1, ...user });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
      await controller.remove(1);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
