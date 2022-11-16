import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { dataSource } from "../db/data-source";
import Post from "./post.entity";
import User from "./user.entity";

@Entity()
export class SubForum {
    static objects = dataSource.getRepository(SubForum);

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => User)
    admin: User;

    @OneToMany(() => Post, (post) => post.subForum)
    posts: Post[];

    @Column({type: "date", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;
}
