import User from "./user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { dataSource } from "../db/data-source";
import { SubForum } from "./subforum.entity";

@Entity()
export default class Post {
    static objects = dataSource.getRepository(Post);

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: "varchar", length: 200 })
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    author: User;

    @Column({ nullable: true })
    image: string;

    @OneToMany(() => Post, (post) => post.parent)
    comments: Post[];

    @ManyToOne(() => Post, (post) => post.comments, { nullable: true })
    parent: Post;

    @ManyToOne(() => SubForum, (subForum) => subForum.posts)
    subForum: SubForum;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
}
