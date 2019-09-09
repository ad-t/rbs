import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Production} from "./production";
import {Seat} from "./seat";

@Entity()
export class Show {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public location: string;

  @Column()
  public time: Date;

  @ManyToOne((type) => Production, (production) => production.shows)
  public production: Production;

  @OneToMany((type) => Seat, (seat) => seat.show, { cascade: true })
  public seats: Seat[];
}
