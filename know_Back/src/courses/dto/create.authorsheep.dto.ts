import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, ValidateIf } from "class-validator";


export class CreateAuthorSheepDTO {
    @ApiProperty({example : 1, description : "course ID"})
    @IsNumber()
    readonly courseId : number

    @ApiProperty({example : 1, description : "author ID"})
    @IsNumber()
    readonly authorId : number
}