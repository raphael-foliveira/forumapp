import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { dataSource } from "../db/data-source";
import Post from "./post.entity";
import User from "./user.entity";

@Entity()
export default class SubForum {
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

    @Column({ type: "date", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];
}
