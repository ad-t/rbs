import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Show } from "./show";

@Entity()
export class TicketType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public description: string;

  @Column()
  public price: number;

  @Column()
  public minPurchaseAmount: number;

  @ManyToOne((type) => Show, (show) => show.ticketTypes, {onDelete: "SET NULL"})
  public show: Show;
}
