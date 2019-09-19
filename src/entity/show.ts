import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Order } from "./order";
import {Production} from "./production";

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public location: string;

  @Column()
  public time: Date;

  @ManyToOne((type) => Production, (production) => production.shows, { onDelete: "CASCADE" })
  public production: Production;

  @Column()
  public totalSeats: number;

  @Column({default: 0})
  public reservedSeats: number;

  @Column({type: "decimal", precision: 13, scale: 2})
  public seatPrice: number;

  // Don't automatically fetch orders
  @OneToMany((type) => Order, (order) => order.show)
  public orders: Promise<Order[]>;
}
