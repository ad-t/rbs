import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Show} from "./show";

@Entity()
export class Production {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public title: string;

  @Column({ length: 100 })
  public subtitle: string;

  @Column({ length: 4 })
  public year: string;

  @Column({ length: 255})
  public description: string;

  @Column()
  public shows: Show[];
}