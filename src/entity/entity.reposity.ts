import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        ...projection,
      })
      // .select('-password');
  }

  async find(entityFilterQuery: FilterQuery<T>): Promise<T[] | null> {
    return this.entityModel
      .find(entityFilterQuery, { __v: 0 })
      .select('-password');
  }

  async create(createEntityData: unknown): Promise<T> {
    return this.entityModel.create(createEntityData);
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true, lean: true },
    );
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    return this.entityModel.findOneAndDelete(entityFilterQuery);
  }
}
