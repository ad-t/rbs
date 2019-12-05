import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Show} from "./show";

@Entity()
export class Production {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public title: string;

  @Column({ length: 100 })
  public subtitle: string;

  @Column()
  public year: number;

  @Column({ length: 255 })
  public description: string;

  @Column({ length: 100})
  public location: string;

  @Column({ length: 300 })
  public showImage: string;

  @OneToMany((type) => Show, (show) => show.production, { cascade: true })
  public shows: Show[];
}
