import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from "path"
import * as uuid from 'uuid';


@Injectable()
export class HelperService {

    async createFile(file : any): Promise<string> {
        try {
            const extention : string = path.extname(file.originalname).toLowerCase()
            const fileName = uuid.v4() + `${extention}`;
            const filePath = path.resolve(__dirname, '..', 'static')
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
            return fileName
        } catch (err) {
            console.log(err)
            throw new HttpException('An error occurred while writing the file', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}