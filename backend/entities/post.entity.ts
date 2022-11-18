import { Entity, Column, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Column()
    content: string;

    @ManyToOne(() => Post, (post) => post.children)
    parent: Post;

    @OneToMany(() => Post, (post) => post.parent, { onDelete: "CASCADE" })
    children: Post[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
