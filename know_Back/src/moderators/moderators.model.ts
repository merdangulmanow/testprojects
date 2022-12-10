import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/users/modesl/users.model";

interface ModeratorCreateAttributes {
    userId : number
}

@Table({tableName : 'moderators'})
export class ModeratorModel extends Model<ModeratorModel, ModeratorCreateAttributes>{
    @ApiProperty({example : 1, description : "ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : false, description : "is activated?"})
    @Column({type : DataType.BOOLEAN, allowNull : false, defaultValue : false})
    status : boolean
    
    @ForeignKey( ()=> UserModel)
    @ApiProperty({example : 1, description : "id of user"})
    @Column({type : DataType.INTEGER})
    userId : number
    @BelongsTo( ()=> UserModel)
    user : UserModel
}