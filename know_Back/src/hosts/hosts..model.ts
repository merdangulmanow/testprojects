import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript"


interface HostCreationAttributes {
    password : string
}

@Table({tableName : "hosts"})
export class HostModel extends Model<HostModel, HostCreationAttributes> {
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "host_password", description : "hosts password"})
    @Column({type : DataType.STRING, allowNull : false})
    password : string

    @ApiProperty({example : "admin", description : "admin or host, defaul will be admin"})
    @Column({type : DataType.STRING,  defaultValue: 'host', allowNull : false })
    role : string

    @ApiProperty({example : "asdfasdfsadfasdf.adfas.fdasdfasdf.asdfas", description : "refresh token"})
    @Column({type : DataType.STRING,  allowNull : true })
    refreshToken : string
}