import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRequisitesDTO {
    @ApiProperty({example : 1, description : "id of author"})
    @IsNumber()
    readonly authorId : number

    @ApiProperty({example : "my company", description : "Название компании"})
    @IsString()
    readonly companyName : string

    @ApiProperty({example : "central bank", description : "bank namy"})
    @IsString()
    readonly bankName : string

    @ApiProperty({example : "paymentAccount in string", description : "paymentAccount"})
    @IsString()
    readonly paymentAccount : string

    @ApiProperty({example : "inn in string", description : "inn"})
    @IsString()
    readonly inn : string

    @ApiProperty({example : "rcbic in string", description : "rcbic"})
    @IsString()
    readonly rcbic : string

}