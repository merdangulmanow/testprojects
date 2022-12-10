import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class activateTopicDTO{
    @ApiProperty({example : true, description : "status of topic"})
    @IsBoolean()
    readonly isActive : boolean

    @ApiProperty({example : '1', description : "topic ID"})
    @IsNumber()
    readonly topicId : number

}