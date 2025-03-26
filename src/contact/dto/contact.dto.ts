import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ContactDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  subject: string;

  @IsNotEmpty()
  @MinLength(10)
  message: string;
} 