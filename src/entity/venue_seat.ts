import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Ticket } from "./ticket";

@Entity()
export class VenueSeat {
  @PrimaryColumn()
  public seatNum: string;

  @Column()
  public wheelchair: boolean;

  // Seat disabled, normal, premium
  @Column()
  public type: number;

  // public priceClass: number;

  // Fixed point, 3 whole digits, 3 decimal places (6 digits total)
  @Column("decimal", { scale: 3, precision: 6 })
  public posX: number;

  // Fixed point, 3 whole digits, 3 decimal places (6 digits total)
  @Column("decimal", { scale: 3, precision: 6 })
  public posY: number;

  @OneToMany((type) => Ticket, (o) => o.seat)
  public tickets: Ticket[];
}
