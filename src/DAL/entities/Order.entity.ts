import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Book } from "./Book.entity";
import { User } from "./User.entity";
import { ESatus } from "../../shared/enum/order.enum";
import { Payment } from "./Payment.entity";



@Entity("orders")
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    totalPrice: number;

    @Column({ type: "enum", enum: ESatus, default: ESatus.PENDING })
    status: ESatus;

    @ManyToMany(() => Book, (book) => book.orders)
    @JoinTable()
    books: Book[];

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn()
    user: User;

    @OneToMany(() => Payment, (payment) => payment.order,{ cascade: true, onDelete: "CASCADE" })
    payments: Payment[];
}