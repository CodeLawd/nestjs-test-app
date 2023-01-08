import { Global, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/entity';
import { Course, CourseDocument } from './schema/course.schema';

@Global()
@Injectable()
export class CoursesRepository extends EntityRepository<CourseDocument> {
  constructor(@InjectModel(Course.name) courseModel: Model<CourseDocument>) {
    super(courseModel);
  }
}
