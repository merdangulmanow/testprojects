import { ApiProperty } from "@nestjs/swagger";
import { IsString, ValidateIf } from "class-validator";

export class CreatePostDto {

    @ApiProperty({example : 'first post', description : "title of post"})
    @IsString()
    // @ValidateIf((value) => value !== null)
    readonly title : string

    @ApiProperty({example : 'hello world', description : "content of post"})
    @ValidateIf((value) => value !== null)
    readonly content : string

}