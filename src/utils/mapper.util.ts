import { Document } from 'mongoose';

export class MapperUtil {

    public static mapSchemaDocumentToDTO<T>(dtoType: T & Document) {
        const { _id, __v, ...data } = dtoType.toObject();
        const dto: T = {
            ...(data as T),
            id: _id.toHexString()
        }
        return dto;
    }
}