import { Model, Document, QueryOptions, ObjectId, UpdateQuery } from "mongoose"


export class BaseRepository<T extends Document>{
    constructor(private readonly model: Model<T>) { }

    async create(doc: any): Promise<T> {
        const createdEntity = new this.model(doc);
        return await createdEntity.save();
    }

    async findById(id: string | ObjectId, option?: QueryOptions): Promise<T> {
        return this.model.findById(id, option);
    }

    async findByIdAndUpdate(id: string | ObjectId, update: UpdateQuery<T>): Promise<T> {
        return this.model.findByIdAndUpdate(id, update);
    }
}