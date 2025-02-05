import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity, OneToMany } from "typeorm";
import { Order } from "./Order.entites";
import { UserRoles } from "../../shared/enum/user.enum";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password:string

    @Column({type : "enum" , enum : UserRoles , default : UserRoles.USER})
    role:UserRoles

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];

}