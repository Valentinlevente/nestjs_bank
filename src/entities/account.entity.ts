/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountNumber: number;

  @Column()
  balance: number;
}
