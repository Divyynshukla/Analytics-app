import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";
import { Match } from '../../decorators/match.decorators'; // custom decorator

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

 @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}
