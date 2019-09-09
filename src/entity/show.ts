import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Production} from "./production";
import {Seat} from "./seat";

export enum SeatStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  PURCHASED = "purchased"
}

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public location: string;

  @Column()
  public time: Date;

  @Column({
    default: SeatStatus.AVAILABLE,
    enum: SeatStatus,
    type: "enum",
  })
  public status: SeatStatus;

  @ManyToOne((type) => Production, (production) => production.shows)
  public production: Production;

  @OneToMany((type) => Seat, (seat) => seat.show, { cascade: true })
  public seats: Seat[];
}
