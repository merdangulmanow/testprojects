import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, ValidateIf } from "class-validator";

export class loginUserDTO {
    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    @IsEmail()
    readonly email : string

    // // @IsNumber()
    // @ApiProperty({example: '2344', description: 'code from email'})
    // @IsString()
    // readonly code : number
}