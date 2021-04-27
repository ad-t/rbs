import {
  Column, PrimaryColumn, Entity
} from "typeorm";

@Entity()
export class Discount {
  @PrimaryColumn({length: 20})
  code: string;

  @Column({length: 50})
  name: string;

  @Column({length: 255})
  message: string;

  @Column()
  minGroupSize: number;

  @Column()
  showId: number;

  @Column()
  waiveHandlingFee: boolean;

  @Column()
  partOfGroup: boolean;
};
