import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TicketType {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 100 })
  public description: string;

  @Column({ type: "decimal", precision: 13, scale: 2})
  public price: number;

  @Column()
  public minPurchaseAmount: number;
}
