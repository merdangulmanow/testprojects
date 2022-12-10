import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/users/modesl/users.model';
import { CreateMessageDTO } from './dto/create.message.dto';
import { MessagesModel } from './models/messages.model';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(MessagesModel) private readonly messageRepository : typeof MessagesModel){}

    async createMessage(dto : CreateMessageDTO){
        try {
            const message : MessagesModel = await this.messageRepository.create(dto)
            return message
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getByGroup(groupdId : number){
        try {
            const messages : MessagesModel[] = await this.messageRepository.findAll({where : {groupdId : groupdId},
                include : [
                    {
                        model : UserModel
                    }
                ],
                order: [
                    ['id', 'DESC']
                ]
            })
            return messages
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    
}