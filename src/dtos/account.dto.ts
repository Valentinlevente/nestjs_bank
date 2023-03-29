import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';
import { Owner } from 'src/entities/owner.entity';

/* eslint-disable prettier/prettier */
export default class AccountDto {
  
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  @IsInt()
  balance: number;
  
  owner: Owner;
}
