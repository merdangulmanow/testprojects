import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "src/users/modesl/users.model";
import {Roles} from "./roles.model";

interface userRoleCreationAttributes {
    userId : number,
    roleId : number
}

@Table({tableName: 'user_roles', updatedAt: false})
export class UserRoles extends Model<UserRoles, userRoleCreationAttributes> {
    @ApiProperty({example : 1, description : "ID"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example : 1, description : "role id"})
    @ForeignKey(() => Roles)
    @Column({type: DataType.INTEGER})
    roleId: number;

    @ApiProperty({example : 1, description : "user id"})
    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER})
    userId: number;

}
