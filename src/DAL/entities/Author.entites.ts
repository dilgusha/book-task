import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany } from "typeorm";
import { Book } from "./Book.entity";

@Entity("authors")
export class Author extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bio:string

    @ManyToMany(() => Book, (book) => book.authors)
    @JoinTable()
    books: Book[];
}