import {
  Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn,
  ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, LessThan
} from "typeorm";
import { Payment } from "./payment";
import { Show } from "./show";
import { Ticket } from "./ticket";
import { Discount } from "./discount";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @Column({length: 50})
  public name: string;

  @Column({length: 50})
  public email: string;

  @Column({length: 20})
  public phone: string;

  @ManyToOne((type) => Show, (show) => show.orders, {onDelete: "SET NULL"})
  public show: Show;

  @Column({default: false})
  public detailsCompleted: boolean;

  @Column()
  public numSeats: number;

  @Column()
  public subtotalPrice: number;

  @Column({default: false})
  public paid: boolean;

  @Column({nullable: true})
  public paidAt: Date;

  @Column({length: 20, nullable: true})
  public voucherCode: string;

  @ManyToOne(type => Discount, { nullable: true })
  @JoinColumn({ name: "voucherCode" })
  public voucher: Discount;

  @OneToOne((type) => Payment, (payment) => payment.order, {cascade: true})
  public payment: Payment;

  @OneToMany((type) => Ticket, (t) => t.order)
  public tickets: Ticket[];
}
