import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { TicketType } from "./ticket_type";
import { VenueSeat } from "./venue_seat";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public phone: string;

  @Column({ length: 10 })
  public postcode: string;

  @Column({nullable: true})
  public checkInTime: Date;

  @ManyToOne((type) => Order, (o) => o.tickets, {onDelete: "CASCADE"})
  public order: Order;

  @ManyToOne((type) => TicketType, {onDelete: "SET NULL"})
  public ticketType: TicketType;

  @ManyToOne((type) => VenueSeat, (o) => o.tickets)
  public seat: VenueSeat;
}
