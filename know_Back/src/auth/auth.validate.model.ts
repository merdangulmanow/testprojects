import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";


interface AuthValidateAttributes {
    email : string;
    code : number;
    validated : boolean
}

@Table({tableName : 'auth_validation', createdAt : false})
export class AuthValidateModel extends Model<AuthValidateModel, AuthValidateAttributes>{
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "user@gmail.com", description : "validation email"})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    email : string;

    @ApiProperty({example : 9090, description : "validation code"})
    @Column({type : DataType.INTEGER, allowNull : false})
    code : number

    @ApiProperty({example : true, description : "email validated or not"})
    @Column({type : DataType.BOOLEAN, allowNull : false, defaultValue : false})
    validated : boolean
}