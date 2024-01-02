import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Permission } from './Permission';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    default: '-',
  })
  username: string;

  @Column({
    length: 20,
    default: '-',
  })
  password: string;

  @JoinTable()
  @ManyToMany(() => Permission)
  permission: Permission[];
}
