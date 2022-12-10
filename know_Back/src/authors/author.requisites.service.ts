import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "src/users/modesl/users.model";
import { CreateRequisitesDTO } from "./dto/create.requisites.dto";
import { AuthorModel } from "./models/author.model";
import { AuthorRequisitesModel } from "./models/author.requisites.model";


@Injectable()
export class AuthorRequisitesService {
    constructor(
        @InjectModel(AuthorRequisitesModel) private readonly requisitesRepository : typeof AuthorRequisitesModel
    ){}

    async create(dto : CreateRequisitesDTO){
        try {
            const condidate : AuthorRequisitesModel = await this.getOne(dto.authorId)
            if(condidate){
                throw new HttpException("already exists", HttpStatus.CONFLICT)
            }
            const requisites : AuthorRequisitesModel = await this.requisitesRepository.create(dto)
            return requisites
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }

    async editRequests(dto : CreateRequisitesDTO){
        try {
            const condidate : AuthorRequisitesModel = await this.getOne(dto.authorId)
            if(!condidate){
                throw new HttpException("can't find this author", HttpStatus.NOT_FOUND)
            }
            condidate.companyName = dto.companyName;
            condidate.bankName = dto.bankName;
            condidate.paymentAccount = dto.paymentAccount
            condidate.inn = dto.inn
            condidate.rcbic = dto.rcbic
            await condidate.save()
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }


    async getOne(authorId : number){
        try {
            const condidate : AuthorRequisitesModel = await this.requisitesRepository.findOne({where : {authorId : authorId}, include : [
                {
                    model : AuthorModel,
                    include : 
                    [ 
                        { 
                            model : UserModel
                         }  
                    ]
                }
            ]})
            return condidate
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
    }
}