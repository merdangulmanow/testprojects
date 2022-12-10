import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsArray } from "class-validator";


export class CreateTagDTO {
    @ApiProperty({example : '1', description : "id of topic"})
    @IsNumber()
    readonly topicId : number;

    @ApiProperty({example : 'фитнес', description : "tag name"})
    @IsArray()
    readonly tags : string[]
}


export class TagsDTO {
    @IsString()
    readonly tag : string
}