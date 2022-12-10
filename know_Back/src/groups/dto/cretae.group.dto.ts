import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber } from "class-validator";
import { messageReasonENUM } from "../enum/message.reason.enum";

export class CreateGroupDTO{
    @ApiProperty({example : messageReasonENUM, description : "reaon off chat"})
    @IsEnum(messageReasonENUM, {message : "reason must be equal to messageReasonENUM"})
    readonly reason : messageReasonENUM
}