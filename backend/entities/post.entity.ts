import { Entity, Column, OneToOne, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { dataSource } from "../db/data-source";
import User from "./user.entity";

@Entity()
export default class Post {
    static objects = dataSource.getRepository(Post);

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;

    @Column()
    content: string;

    @ManyToOne(() => Post, (post) => post.children, { nullable: true })
    parent: Post;

    @OneToMany(() => Post, (post) => post.parent, { onDelete: "CASCADE" })
    children: Post[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

}
