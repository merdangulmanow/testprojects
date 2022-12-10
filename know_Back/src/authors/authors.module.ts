import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { RolesModule } from 'src/roles/roles.module';
import { UserModel } from 'src/users/modesl/users.model';
import { UsersModule } from 'src/users/users.module';
import { AuthorModel } from './models/author.model';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { AuthorRequisitesModel } from './models/author.requisites.model';
import { AuthorRequisitesService } from './author.requisites.service';
import { CoursesModel } from 'src/courses/models/courses.model';
import { Topics } from 'src/topics/topic.model';
import { AuhtorTopicsModel } from './models/author.topics.model';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService, AuthorRequisitesService],
  imports : [
    SequelizeModule.forFeature([
      AuthorModel, UserModel, AuthorRequisitesModel, 
      CoursesModel, Topics, AuhtorTopicsModel
    ]),
    UsersModule, AuthModule, RolesModule
  ],
  exports :[
    AuthorsService
  ]
})
export class AuthorsModule {}
