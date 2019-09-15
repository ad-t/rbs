import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Show} from "./show";

export enum SeatStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  PURCHASED = "purchased"
}

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 2 })
  public row: string;

  @Column()
  public seatNumber: number;

  @Column({
    default: SeatStatus.AVAILABLE,
    enum: SeatStatus,
    type: "enum",
  })
  public status: SeatStatus;

  @ManyToOne((type) => Show, (show) => show.seats)
  public show: Show;
}
