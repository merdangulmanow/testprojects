import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateReviewDTO {
    @ApiProperty({example : "Jane Doe", description : 'author of comment'})
    @IsString()
    readonly name : string

    @ApiProperty({example : "???", description : "status of comment"})
    @IsString()
    readonly status : string

    @ApiProperty({example : "this is realy best course", description : "comment"})
    @IsString()
    readonly comment : string
}