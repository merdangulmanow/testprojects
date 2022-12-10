import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class refreshTokenDTO {
    @ApiProperty({example : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZXMiOlsiaG9zdCJdLCJpYXQiOjE2NTA5OTI5NTQsImV4cCI6MTY1MTA3OTM1NH0.jik60N3d8dK4f0Za9rwSPfwqjvPVIWj8lvXQp8hF6O4", description : 'host refresh token'})
    @IsString()
    readonly refreshToken : string
}