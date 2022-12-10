import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from "path"
import * as uuid from 'uuid';
import * as nodemailer from "nodemailer"
import {google} from 'googleapis'
import { Cache } from 'cache-manager';
import { FcmTokenDTO } from './dto/fcm.token.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class HelperService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
    

    //// files service 
    async createFile(file): Promise<string> {
        try {
            // const fileName = uuid.v4() + '.jpg';
            const extention : string = path.extname(file.originalname).toLowerCase()
            const fileName = uuid.v4() + `${extention}`;
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createMultiFiles(files : any){
        try {
            const filePath = path.resolve(__dirname, '..', 'static', 'courses')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            const createdFiles : string[] = []
            for(let i = 0; i < files.length; i++){
                const file = files[i]
                const extention : string = path.extname(file.originalname).toLowerCase()
                const fileName = uuid.v4() + `${extention}`;
                fs.writeFileSync(path.join(filePath, fileName), file.buffer)
                createdFiles.push(`courses/${fileName}`)
            }
            return createdFiles
        } catch (err) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createCourseCoverTrailer(file : any, type : string){
        try {
            // const fileName = uuid.v4() + '.jpg';
            const extention : string = path.extname(file.originalname).toLowerCase()
            const fileName = uuid.v4() + `${extention}`;
            const filePath = path.resolve(__dirname, '..', 'static', 'courses', `${type}`)
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return `courses/${type}/${fileName}`
        } catch (err) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createLessonFiles(file : any){
        try {
            const extention : string = path.extname(file.originalname).toLowerCase()
            const fileName = uuid.v4() + `${extention}`;
            const filePath = path.resolve(__dirname, '..', 'static', 'lessons')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return `lessons/${fileName}`
        } catch (err) {
            console.log(err.message)
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //// mail service
    async sendEmail( email : string){
        try {
            const oAuth2Client = new google.auth.OAuth2(
                process.env.CLIENT_ID,
                process.env.CLEINT_SECRET,
                process.env.REDIRECT_URI
              );
                oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
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

            await this.cacheManager.set(email, {email : code}, { ttl: ( 10 * 60 * 1000) } );
            return { email : email, code : code}
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

    ///// PUSH NOTIFICATIONS
    
    async setToken(dto : FcmTokenDTO){
        try {
          const tokens : FcmTokenDTO[] = await this.cacheManager.get('tokens')
          if(!tokens){
            await this.cacheManager.set('tokens', [dto], { ttl: (60 * 3600 * 1000) })
          }
          var picked = tokens.find(o => o.userId == dto.userId);
          if(!picked){
            tokens.push(dto)
            await this.cacheManager.set('tokens', tokens, { ttl: (60 * 3600 * 1000) })
          } 
          else if(picked.token != dto.token){
            const index : number = tokens.findIndex(i => i.userId === dto.userId);
            if(index != -1){
              tokens[index].token = dto.token
              await this.cacheManager.set('tokens', tokens, { ttl: (60 * 3600 * 1000) })
            }
          }
          return {message : "token cached!"}
        } catch (err) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
      }
    
      async fetchTokenByUserId(userId : number){
        try {
          const data : FcmTokenDTO[] = await this.cacheManager.get('tokens')
          if(!data){
            return 
          }
          var picked = data.find(o => o.userId == userId);
          return picked
        } catch (err) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
      }
    
      async deviceNotification(userId : number, payload : any){
        try {
          const data : FcmTokenDTO = await this.fetchTokenByUserId(userId)
          if(data){
            throw new HttpException("can not find this user", HttpStatus.BAD_REQUEST)
          }
          const options = {
            priority: "high",
            timeToLive: 60 * 60 *24
        };
          await admin.messaging().sendToDevice(data.token, payload, options);
        } catch (err) {
          throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
      }

}