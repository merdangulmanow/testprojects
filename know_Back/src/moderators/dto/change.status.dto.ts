import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";


export class ChangeStatusDTO {
    @ApiProperty({example : "1", description : "user id"})
    @IsNumber()
    readonly userId : number

    @ApiProperty({example : false, description : "new status of moderator"})
    @IsBoolean()
    readonly status : boolean
}