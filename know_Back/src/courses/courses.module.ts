import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorModel } from 'src/authors/models/author.model';
import { CoursesController } from './courses.controller';
import { CoursesModel } from './models/courses.model';
import { CoursesService } from './courses.service';
import { TagsModel } from 'src/tags/tags.model';
import { CourseTagsModel } from './models/course.tags.model';
import { HelperModule } from 'src/helper/helper.module';
import { LessonsModel } from './models/course.lessons.model';
import { LessonsService } from './lessons.service';
import { courseAuthorsheepModel } from './models/course.authorsheep.model';
import { AuthorsModule } from 'src/authors/authors.module';
import { CourseChargeableModel } from './models/coruse.chargeable.model';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService, LessonsService],
  imports : [
    SequelizeModule.forFeature([
      AuthorModel, CoursesModel, TagsModel, CourseTagsModel, 
      LessonsModel, courseAuthorsheepModel, CourseChargeableModel
    ]),
    HelperModule, AuthorsModule, AuthModule, UsersModule
  ]
})
export class CoursesModule {}
