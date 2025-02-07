import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany, ManyToOne } from "typeorm";
import { Order } from "./Order.entity";
import { EUserRoles } from "../../shared/enum/user.enum";
import { Payment } from "./Payment.entity";

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

}