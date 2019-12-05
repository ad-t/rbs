import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Order } from "./order";
import {Production} from "./production";
import { TicketType } from "./ticket_type";

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public time: Date;

  @ManyToOne((type) => Production, (production) => production.shows, { onDelete: "CASCADE" })
  public production: Production;

  @Column()
  public totalSeats: number;

  @Column({default: 0})
  public reservedSeats: number;

  // Don't automatically fetch orders
  @OneToMany((type) => Order, (order) => order.show)
  public orders: Promise<Order[]>;

  @OneToMany((type) => TicketType, (tt) => tt.show)
  public ticketTypes: TicketType[];
}
