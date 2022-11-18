import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
    ManyToOne,
} from "typeorm";
import { dataSource } from "../db/data-source";
import Thread from "./thread.entity";
import Comment from "./comment.entity";
import Post from "./post.entity";
import SubForum from "./subforum.entity";

@Entity()
export default class User {
    static objects = dataSource.getRepository(User);

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    profilePicture: string;

    @OneToMany(() => Post, (post) => post.author, { onDelete: "SET NULL" })
    posts: Post[];

    @OneToMany(() => User, (user) => user.friends)
    friends: User[];

    @ManyToMany(() => SubForum, (subForum) => subForum.members)
    subForums: SubForum[];
}
