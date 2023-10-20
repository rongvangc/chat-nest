import { IsString, IsStrongPassword } from 'class-validator';

export class AuthCreateDto {
  @IsString()
  username: string;

  @IsString()
  displayName: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class AuthLoginDto {
  @IsString()
  username: string;

  @IsStrongPassword({ minLength: 8 })
  password: string;
}
