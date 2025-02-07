import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Order } from "./Order.entity";
import { EPaymentStatus } from "../../shared/enum/payment.enum";

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column()
    transactionId: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: "enum", enum: EPaymentStatus, default: EPaymentStatus.PENDING })
    status: EPaymentStatus

    @ManyToOne(() => User, (user) => user.payments, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Order, (order) => order.payments, { onDelete: "CASCADE" })
    order: Order;
}
