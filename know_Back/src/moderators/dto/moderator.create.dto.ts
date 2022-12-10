import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";


export class CreateModeratorDTO {
    @ApiProperty({example : "1", description : "user id"})
    @IsNumber()
    readonly userId : number
}