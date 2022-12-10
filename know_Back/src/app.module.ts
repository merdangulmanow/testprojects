import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from "@nestjs/sequelize"
import { Roles } from './roles/roles.model';
import { Topics } from './topics/topic.model';
import { UserModel } from './users/modesl/users.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthValidateModel } from './auth/auth.validate.model';
import { TagsModel } from './tags/tags.model';
import { UserTopicModel } from './users/modesl/user.topics.model';
import { AdminModel } from './admins/admin.model';
import { AuthorModel } from './authors/models/author.model';
import { ModeratorModel } from './moderators/moderators.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AdminsModule } from './admins/admins.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthorsModule } from './authors/authors.module';
import { CoursesModule } from './courses/courses.module';
import { ModeratorsModule } from './moderators/moderators.module';
import { TagsModule } from './tags/tags.module';
import { TopicsModule } from './topics/topics.module';
import { HostsModule } from './hosts/hosts.module';
import { HostModel } from './hosts/hosts..model';
import { AuthorRequisitesModel } from './authors/models/author.requisites.model';
import { CoursesModel } from './courses/models/courses.model';
import { AuhtorTopicsModel } from './authors/models/author.topics.model';
import { CourseTagsModel } from './courses/models/course.tags.model';
import { HelperModule } from './helper/helper.module';
import { LessonsModel } from './courses/models/course.lessons.model';
import { courseAuthorsheepModel } from './courses/models/course.authorsheep.model';
import { CourseChargeableModel } from './courses/models/coruse.chargeable.model';
import { GroupsModule } from './groups/groups.module';
import { GroupModel } from './groups/models/groups.mode';
import { MessagesModule } from './messages/messages.module';
import { MessagesModel } from './messages/models/messages.model';


@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
        envFilePath : '.env'
    }),
    ServeStaticModule.forRoot({
      rootPath : join(__dirname, 'static'),
      serveRoot : "/api"
    }),
    SequelizeModule.forRoot({
      dialect : 'postgres',
      host : process.env.POSTGRES_HOST,
      port : Number(process.env.POSTGRES_PORT),
      username : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASSWORD,
      database : process.env.POSTGRES_DB,
      models: [ 
        Roles, Topics, UserModel, UserRoles, 
        AuthValidateModel, TagsModel, UserTopicModel, 
        AdminModel, AuthorModel, ModeratorModel, 
        HostModel, AuthorRequisitesModel, CoursesModel, 
        AuhtorTopicsModel, CourseTagsModel, LessonsModel,
        courseAuthorsheepModel, CourseChargeableModel, 
        GroupModel, MessagesModel
      ],
      autoLoadModels : true,
      // logging : true,
      // sync : {force : true}
  }),
    AdminsModule,
    RolesModule,
    UsersModule,
    AuthModule,
    AuthorsModule,
    CoursesModule,
    ModeratorsModule,
    TagsModule,
    TopicsModule,
    HostsModule,
    HelperModule,
    GroupsModule,
    MessagesModule,
  ]
})
export class AppModule {}
