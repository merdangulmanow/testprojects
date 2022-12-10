import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({example: 'user', description: 'name of the role'})
    @IsString({message: "must be string"})
    readonly name: string;
}