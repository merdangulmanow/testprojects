import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as path from "path"
import * as uuid from 'uuid';


@Injectable()
export class FilesService {

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

}