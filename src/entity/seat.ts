import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Show} from "./show";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 2 })
  public row: string;

  @Column()
  public seatNumber: number;

  @ManyToOne((type) => Show, (show) => show.seats)
  public show: Show;
}
