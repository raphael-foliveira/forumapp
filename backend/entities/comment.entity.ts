import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { dataSource } from "../db/data-source";
import Post from "./post.entity";
import Thread from "./thread.entity";

@Entity()
export default class Comment {
    static objects = dataSource.getRepository(Comment);

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Thread)
    thread: Thread;

    @OneToOne(() => Post)
    @JoinColumn()
    post: Post;
}
