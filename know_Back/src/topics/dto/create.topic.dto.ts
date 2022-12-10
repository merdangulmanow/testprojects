import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray } from "class-validator";
import { TagsDTO } from "src/tags/dto/create.tag.dto";

export class CreateTopicDTO {
    @ApiProperty({example : 'фитнес', description : "topic name"})
    @IsString({message : "'name' property must be string"})
    readonly name : string

    @ApiProperty({example : '1eb4fbde-b09d-44db-aece-75df5d5de420.jpg', description : "fileName, response of {__baseUrl__}/topics/image"})
    @IsString()
    readonly imageUrl : string

    @ApiProperty({example : ["tag 1", "tag 2"], description : "array of tag names"})
    @IsArray()
    readonly tags : string[]
}