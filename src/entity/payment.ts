import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";

export enum PaymentMethod {
  CASH = "cash",
  PAYPAL = "paypal",
  SQUARE = "square",
  MANUAL_OVERRIDE = "override"
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  public id: number;

  @OneToOne((type) => Order, (order) => order.payment, {onDelete: "SET NULL"})
  @JoinColumn()
  public order: Order;

  @Column({type: "enum", enum: PaymentMethod, nullable: true})
  public method: PaymentMethod;

  @Column()
  public totalPrice: number;

  @Column({nullable: true})
  public notes: string;

  // Paypal: OrderID
  // Stripe: CHECKOUT_SESSION_ID
  // Square: reference_id
  @Column()
  public transactionID: string;

  // For Paypal only
  @Column({nullable: true})
  public captureID: string;
}
