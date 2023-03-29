import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

/* eslint-disable prettier/prettier */
export default class OwnerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsBoolean()
  @IsNotEmpty()
  business: boolean;
}
