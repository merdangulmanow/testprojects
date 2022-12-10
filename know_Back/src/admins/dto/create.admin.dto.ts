import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, ValidateIf } from "class-validator";

export class AdminCreateDTO {
    @ApiProperty({example : "user@gmail.com", description : "admin | host email"})
    @IsEmail()
    readonly email : string

    // @ApiProperty({example : "admin", description : "admin or host, defaul will be admin, CAN BE NULL"})
    // @ValidateIf((value) => value !== null)
    // role : string | null
}