import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { dataSource } from '../db/data-source';
import Post from './post.entity';
import SubForum from './subforum.entity';

@Entity()
export default class Thread {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @OneToOne(() => Post)
  @JoinColumn()
  post: Post;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => SubForum, (subForum) => subForum.threads)
  subForum: SubForum;
}

export const threadRepository = dataSource.getRepository(Thread);
