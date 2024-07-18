import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let service: UserService;
  let repository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [{ id: 1, name: 'Test User', age: 30, email: 'test@example.com' }];
      repository.find.mockResolvedValue(expectedUsers);
      const users = await service.findAll();
      expect(users).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = { id: 1, name: 'Test User', age: 30, email: 'test@example.com' };
      repository.findOneBy.mockResolvedValue(expectedUser);
      const user = await service.findOne(1);
      expect(user).toEqual(expectedUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = { name: 'Test User', age: 30, email: 'test@example.com' };
      repository.save.mockResolvedValue({ id: 1, ...user });
      const newUser = await service.create(user as User);
      expect(newUser).toEqual({ id: 1, ...user });
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const user = { name: 'Updated User', age: 31, email: 'updated@example.com' };
      repository.update.mockResolvedValue(null);
      repository.findOneBy.mockResolvedValue({ id: 1, ...user });
      const updatedUser = await service.update(1, user as User);
      expect(updatedUser).toEqual({ id: 1, ...user });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      repository.delete.mockResolvedValue(null);
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
