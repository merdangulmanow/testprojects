import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class FcmTokenDTO {
    @ApiProperty({example : 1, description : "userId"})
    @IsNumber()
    readonly userId : number

    @ApiProperty({example : "d3web5FdTDaLGOeMxuJ8Ye:APA91bFcmRVoMxWZxOssR3U1R8kenxXiqrW2bq83QoIG04W0XLkvwtlkkYFI4qnOQouZs4XDknizHd8s7IL3ZqH_pdTl657kiQQpF8LJnj2ECI2KKQgyIihJpWdaSvh40OLLHqc61KnM", description : "fcm token"})
    @IsString()
    token : string
}