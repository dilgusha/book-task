import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    

    @Column()
    title: string;

    @ManyToOne(() => User, (user) => user.books,{cascade:true})
    user: User;
}