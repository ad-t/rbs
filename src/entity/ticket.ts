import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order";
import { TicketType } from "./ticket_type";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @ManyToOne((type) => Order, (o) => o.tickets, {onDelete: "CASCADE"})
  public order: Order;

  @ManyToOne((type) => TicketType, {onDelete: "SET NULL"})
  public ticketType: TicketType;
}
