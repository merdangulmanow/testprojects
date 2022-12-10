import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topics } from 'src/topics/topic.model';
import { TagsModel } from './tags.model';
import { CoursesModel } from 'src/courses/models/courses.model';
import { CourseTagsModel } from 'src/courses/models/course.tags.model';

@Module({
  providers: [TagsService],
  controllers: [TagsController],
  imports : [
    SequelizeModule.forFeature([
      Topics, TagsModel, CoursesModel, CourseTagsModel
    ])
  ],
  exports : [TagsService]
})
export class TagsModule {}
