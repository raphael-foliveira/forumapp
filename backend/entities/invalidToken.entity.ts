import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import { dataSource } from '../db/data-source';

@Entity()
export default class InvalidToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @ManyToOne(() => User)
  owner: User;
}

export const invalidTokenRepository = dataSource.getRepository(InvalidToken);
