import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class createCourseTagDTO{
    @ApiProperty({example : 1, description : "id of course"})
    @IsNumber()
    readonly courseId : number

    @ApiProperty({example : 1, description : "id of tag"})
    @IsNumber()
    readonly tagId : number
    
}