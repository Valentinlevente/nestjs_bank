import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

/* eslint-disable prettier/prettier */
export default class AccountDto {
  
  @IsString()
  @IsNotEmpty()
  accountNumber: string;
  @IsNotEmpty()
  @IsInt()
  balance: number;
}
