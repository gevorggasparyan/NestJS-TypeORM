import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({ example: 30, description: 'The age of the user' })
  @Column()
  age: number;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @Column()
  email: string;
}
