import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    default: '-',
  })
  name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  desc: string;
}
