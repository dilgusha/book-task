import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./Order.entity";
import { EUserRoles } from "../../shared/enum/user.enum";
import { Payment } from "./Payment.entity";
import { Book } from "./Book.entity";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string

    @Column({ type: "enum", enum: EUserRoles, default: EUserRoles.USER })
    role: EUserRoles

    @OneToMany(() => Order, (order) => order.user,{ cascade: true, onDelete: "CASCADE" })
    orders: Order[];

    @ManyToOne(() => Payment, (payment) => payment.user,{ cascade: true, onDelete: "CASCADE" })
    payments: Payment[];

    @OneToMany(() => Book, (book) => book.rentedBy)
    rentedBooks: Book[];  

    @ManyToMany(() => Book, { cascade: true })
    @JoinTable()
    purchasedBooks: Book[];  

    @Column("json", { nullable: true })
    ratings: { bookId: number; rating: number }[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}