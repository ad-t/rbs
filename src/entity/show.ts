import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
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
}
