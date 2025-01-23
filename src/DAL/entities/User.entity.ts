import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./Book.entity";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Book, (book) => book.user, { onDelete: 'CASCADE'})
    books: Book[];
}