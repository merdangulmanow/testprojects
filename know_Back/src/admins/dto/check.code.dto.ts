import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, ValidateIf } from "class-validator";

export class checkCodeDTO {

    @ApiProperty({example : "user@gmail.com", description : "admin | host email"})
    @IsEmail()
    readonly email : string

    
    @ApiProperty({example : "1234", description : "code from email"})
    @IsString()
    readonly code : string

}