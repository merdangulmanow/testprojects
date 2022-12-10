import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsArray } from "class-validator";

export class createUserTopicDTO {
    @ApiProperty({example: '1', description: 'user id'})
    @IsNumber()
    readonly userId : number

    @ApiProperty({example: '[1,2,3]', description: 'array of topic id'})
    @IsArray()
    readonly topicId : number[]
}