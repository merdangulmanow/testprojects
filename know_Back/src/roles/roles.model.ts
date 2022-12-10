import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserModel } from "src/users/modesl/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttributes {
    name : string,
}

@Table({tableName : 'roles', updatedAt : false})
export class Roles extends Model<Roles, RoleCreationAttributes> {
    @ApiProperty({example : 1, description : "user ID"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "user", description : "role name"})
    @Column({type : DataType.STRING, unique : true, allowNull : false})
    name : string;

    @BelongsToMany(() => UserModel, () => UserRoles)
    users: UserModel[];
}