import { 
    BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, 
    ManyToOne, OneToMany, JoinTable 
} from "typeorm";
import { Author } from "./Author.entity";
import { Order } from "./Order.entity";
import { User } from "./User.entity";

@Entity("books")
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @Column()
    soldCount: number;

    @CreateDateColumn()
    publishedDate: Date; 

    @ManyToOne(() => User, (user) => user.rentedBooks, { nullable: true, onDelete: "SET NULL" })
    rentedBy: User | null;  

    @Column({ type: "timestamp", nullable: true })
    rentExpiresAt: Date | null; 

    @Column({ default: false })
    isRented: boolean;

    @Column("json", { nullable: true })
    ratings: { userId: number; rating: number }[];

    @Column({ type: "float", default: 0 })
    averageRating: number;

    @Column({ type: "int", default: 0 })
    readCount: number;

    @ManyToMany(() => Author, (author) => author.books)
    authors: Author[];

    @ManyToMany(() => Order, (order) => order.books)
    orders: Order[];
}
