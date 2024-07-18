import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: number, user: User): Promise<User> {
    try {
      await this.userRepository.update(id, user);
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
