import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { dataSource } from '../db/data-source';
import Thread from './thread.entity';
import User from './user.entity';

@Entity()
export default class SubForum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User)
  admin: User;

  @Column()
  image: string;

  @OneToMany(() => Thread, (post) => post.subForum, { onDelete: 'CASCADE' })
  threads: Thread[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => User, (user) => user.subForums)
  @JoinTable()
  members: User[];
}

export const subforumRepository = dataSource.getRepository(SubForum);
