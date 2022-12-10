import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, ValidateIf } from "class-validator";

export class EmailValidateDTO {
    @ApiProperty({example: 'user@mail.ru', description: 'email'})
    @IsString({message : "must be string"})
    readonly email : string

    @ApiProperty({example: '1234', description: 'code for validate'})
    @IsString({message : "must be string"})
    readonly code : string
}