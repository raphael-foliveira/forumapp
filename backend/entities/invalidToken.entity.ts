import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { dataSource } from "../db/data-source";
import User from "./user.entity";

@Entity()
export default class InvalidToken {
    static objects = dataSource.getRepository(InvalidToken);

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    token: string;

    @ManyToOne(() => User)
    owner: User;
}
