import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateMessageDTO {
    @ApiProperty({example : '1', description : 'ID of user'})
    @IsNumber()
    readonly userId : number

    @ApiProperty({example : '1', description : 'ID of group'})
    @IsNumber()
    readonly groupId : number

    @ApiProperty({example : "hello!", description : "text of message"})
    @IsString()
    readonly message : string
}