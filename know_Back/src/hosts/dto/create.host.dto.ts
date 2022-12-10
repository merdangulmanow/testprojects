import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHostDTO {
    @ApiProperty({example : "host_password", description : 'password'})
    @IsString()
    readonly password : string
}