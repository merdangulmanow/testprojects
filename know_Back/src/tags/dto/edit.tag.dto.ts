import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class editTagDTO {
    @ApiProperty({example : '1', description : "id of tag"})
    @IsNumber()
    readonly id : number | null;

    @ApiProperty({example : 'фитнес', description : "tag name"})
    @IsString()
    readonly tag : string
}