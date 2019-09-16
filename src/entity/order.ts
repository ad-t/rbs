import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Show } from "./show";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @CreateDateColumn()
  public createdAt: Date;

  @Column({length: 50})
  public name: string;

  @Column({length: 50})
  public email: string;

  @Column({length: 20})
  public phone: string;

  @ManyToOne((type) => Show, (show) => show.orders, {nullable: false})
  public show: Show;

  @Column()
  public numSeats: number;

  @Column({type: "decimal", precision: 13, scale: 2})
  public subtotalPrice: number;

  @Column({default: false})
  public paid: boolean;

  @Column()
  public paidAt: Date;
}
