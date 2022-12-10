import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class editTopicDTO {
    @ApiProperty({example : 'фитнес', description : "topic name"})
    @IsString({message : "'name' property must be string"})
    readonly name : string

    @ApiProperty({example : '[{"id" : 1, "tag":"first tag"},{"id" : 2, "tag":"second tag"}]', description : "array of tag names"})
    @IsString()
    readonly tags : string
}