import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer"
import {google} from 'googleapis'
import { Cache } from 'cache-manager';

@Injectable()
export class MailService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}


    async sendEmail( email : string){
        try {
            const oAuth2Client = new google.auth.OAuth2(
                process.env.CLIENT_ID,
                process.env.CLEINT_SECRET,
                process.env.REDIRECT_URI
              );
                oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

                // console.log('\n\n\n\n')
                const accessToken = await oAuth2Client.getAccessToken();
                // console.log(accessToken)
                // console.log('\n\n\n\n')
                const transport  = nodemailer.createTransport({
                service : "gmail",
                //   secure : false,
                auth: {
                    type: 'OAuth2',
                    user: 'mr.merdanov.merdan@gmail.com',
                    clientId: process.env.CLIENT_ID,
                    clientSecret: process.env.CLEINT_SECRET,
                    refreshToken: process.env.REFRESH_TOKEN,
                    accessToken: accessToken,
                },
                });
                const code : string = await this.getRandomNUmber()
                const mailOptions = {
                    from: 'KNOW <mr.merdanov.merdan@gmail.com>',
                    to: email,
                    subject: 'Подтверждение электронной почты',
                    text: 'Подтверждение электронной почты',
                    html: 
                    `
                        <h3>
                            Your code is ${code}
                        </h3>
                    `,
                };

            const response = await transport.sendMail(mailOptions);
            console.log(response)

            await this.cacheManager.set(email, {email : code}, { ttl: (120 * 1000) } );
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_GATEWAY)
        }
    }

    async getCodeByEmail(email : string){
        try {
            const data = await this.cacheManager.get(email)
            return data
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_GATEWAY)
        }
    }

    private async getRandomNUmber(){
        try {
            const code = Math.floor(1000 + Math.random() * 9000).toString();
            return code
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}