import { Model, ObjectId, RemoveOptions, UpdateWriteOpResult } from 'mongoose';

export abstract class BaseService<T> {
  private baseService: Model<T>;

  protected constructor(baseService: Model<T>) {
    this.baseService = baseService;
  }

  public async create(data: T | any): Promise<T> {
    return await this.baseService.create(data);
  }

  public async update(
    filter: any,
    fieldUpdate: any,
  ): Promise<UpdateWriteOpResult> {
    return await this.baseService.updateOne(filter, fieldUpdate).exec();
  }

  public async findAll(): Promise<T[]> {
    return await this.baseService.find().exec();
  }

  public async find(filter: any): Promise<T[]> {
    return await this.baseService.find(filter).exec();
  }

  public async findOne(filter: any): Promise<T> {
    return await this.baseService.findOne(filter).exec();
  }

  public async deleteOne(filter: any): Promise<any> {
    return await this.baseService.deleteOne(filter).exec();
  }

  public async deleteAll(filter: any): Promise<any> {
    return await this.baseService.deleteMany(filter).exec();
  }
}
