import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";

export enum ESatus {
    PENDING = "PENDING",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}

@Entity("orders")
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity : number;

    @Column()
    totalPrice : number;

    @Column({type : "enum" , enum : ESatus , default : ESatus.PENDING})
    status : ESatus;

    @ManyToMany(() => Book, (book) => book.orders)
    @JoinTable()
    books: Book[];

    @ManyToOne(() => User, (user) => user.orders)
    user: User;
}