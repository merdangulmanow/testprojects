import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNumber } from "class-validator"
import { authorsheepENUM } from "../enum/authorsheep.enum"

export class ChangeAuthorSheepStatusDTO {

    @ApiProperty({example : 1, description : "course authorsheep ID"})
    @IsNumber()
    readonly id : number

    @ApiProperty({example : "https://instagram.com/asdflsadf", description : "link to instagram, CAN BE NULL"})
    @IsEnum(authorsheepENUM)
    readonly status : authorsheepENUM
}