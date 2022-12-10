import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, ValidateIf } from "class-validator";

export class loginHost {
    @ApiProperty({example : "user@gmail.com", description : "admin | host email"})
    @IsEmail()
    readonly email : string

}