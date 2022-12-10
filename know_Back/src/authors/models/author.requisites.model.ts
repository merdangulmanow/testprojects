import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AuthorModel } from "./author.model";

interface AuthorRequisitesCreateAttributes {
    authorId : number;
    companyName : string;
    bankName : string;
    paymentAccount : string;
    inn : string;
    rcbic : string
}

@Table({tableName : 'author_requisites'})
export class AuthorRequisitesModel extends Model<AuthorRequisitesModel, AuthorRequisitesCreateAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @Column({type : DataType.STRING, allowNull : false})
    companyName : string

    @Column({type : DataType.STRING, allowNull : false})
    bankName : string

    @Column({type : DataType.STRING, allowNull : false})
    paymentAccount : string

    @Column ({type : DataType.STRING, allowNull : false})
    inn : string

    @Column({type : DataType.STRING, allowNull : false})
    rcbic : string

    @ForeignKey( ()=> AuthorModel)
    @Column({type : DataType.INTEGER})
    authorId : number
    @BelongsTo( ()=> AuthorModel)
    author : AuthorModel
}