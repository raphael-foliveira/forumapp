import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { dataSource } from '../db/data-source';
import Post from './post.entity';
import SubForum from './subforum.entity';
import Vote from './vote.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Post, (post) => post.author, { onDelete: 'SET NULL' })
  posts: Post[];

  @OneToMany(() => User, (user) => user.friends)
  friends: User[];

  @ManyToMany(() => SubForum, (subForum) => subForum.members)
  subForums: SubForum[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];
}

export const userRepository = dataSource.getRepository(User);
