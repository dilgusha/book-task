import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Author } from "./Author.entity";
import { Order } from "./Order.entity";

@Entity("books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    price:number

    @Column()
    stock: number;

    @Column()
    soldCount: number;

    @ManyToMany(() => Author, (author) => author.books)
    authors: Author[];

    @ManyToMany(() => Order, (order) => order.books)
    orders: Order[];

}