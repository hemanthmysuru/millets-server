import dotenv from 'dotenv';
// export const MONGO_URI: string = "mongodb://localhost:27017/millets";

dotenv.config();

export const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/millets';
export const DB_NAME = process.env.DB_NAME || 'millets';
export const COLLECTION_NAME = process.env.COLLECTION_NAME || 'initCollection';
export const PORT = process.env.PORT || 3000;
export const LOGGER_CONFIG = {
    log: {
        level: 'info', // default
        file: {
            level: 'error',
            filename: 'millets-app.log'
        }
    }
}