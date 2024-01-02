import { IsNotEmpty, Length } from 'class-validator';
export class LoginData {
  @IsNotEmpty()
  @Length(1, 20)
  username: string;
  @Length(6, 20)
  password: string;
}
