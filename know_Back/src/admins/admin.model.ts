import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript"


interface AdminCreationAttributes {
    email : string
}

@Table({tableName : "admins"})
export class AdminModel extends Model<AdminModel, AdminCreationAttributes> {
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "user@gmail.com", description : "admin email"})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    email : string

    @ApiProperty({example : "admin", description : "admin or host, defaul will be admin"})
    @Column({type : DataType.STRING,  allowNull : true })
    refreshToken : string
}