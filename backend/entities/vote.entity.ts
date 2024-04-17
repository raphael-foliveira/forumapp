import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import Post from './post.entity';
import User from './user.entity';
import { dataSource } from '../db/data-source';

@Entity()
@Index(['post', 'user'], { unique: true })
export default class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: 1 | -1;

  @ManyToOne(() => Post, (post) => post.votes)
  post: Post;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;
}

export const voteRepository = dataSource.getRepository(Vote);
