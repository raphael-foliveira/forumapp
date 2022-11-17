import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { dataSource } from "../db/data-source";
import Post from "./post.entity";

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

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => User, (user) => user.friends)
    friends: User[];
}
