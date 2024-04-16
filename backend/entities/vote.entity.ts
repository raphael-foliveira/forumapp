import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { dataSource } from '../db/data-source';
import Post from './post.entity';
import User from './user.entity';

@Entity()
@Index(['post', 'user'], { unique: true })
export default class Vote {
  static objects = dataSource.getRepository(Vote);

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: 1 | -1;

  @ManyToOne(() => Post, (post) => post.votes)
  post: Post;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;
}
