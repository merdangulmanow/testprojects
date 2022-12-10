import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsEmail } from "class-validator";

export class LoginUserDTO {
    @ApiProperty({example : "user@gmail.com", description : "user's email"})
    @IsEmail()
    readonly email : string

    @ApiProperty({example : "password123", description : "user's password"})
    @IsString()
    @Length(5, 25)
    readonly password : string
}