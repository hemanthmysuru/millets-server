import mongoose, { Connection } from "mongoose";
import { MONGO_URI, DB_NAME, COLLECTION_NAME } from "../config";
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import { LoggerService } from "./logger.service";

class DBConnectionService {

    private static instance: DBConnectionService;
    private connection!: Connection;
    private logger: LoggerService;

    constructor() {
        this.logger = LoggerService.getInstance();
    }

    public static getInstance(): DBConnectionService {
        if (!this.instance) {
            this.instance = new DBConnectionService();
        }
        return this.instance;
    }

    public async createDB(mongoURI: string, dbName: string): Promise<void> {
        const client = new MongoClient(mongoURI);
        try {
            await client.connect();
            const adminDb = client.db().admin();
            const dbList = await adminDb.listDatabases();
            const dbExists = dbList.databases.some(db => db.name === dbName);

            if (!dbExists) {
                console.log(`Database '${dbName}' doesn't exist. Creating...`);
                const newDb = client.db(dbName);
                await newDb.createCollection(COLLECTION_NAME);
                console.log(`Database '${dbName}' created successfully.`);
            } else {
                console.log(`Database '${dbName}' already exists.`);
            }
        } finally {
            await client.close();
        }
    }

    public async connect(): Promise<void> {
        const URI = `${MONGO_URI}/${DB_NAME}`;
        try {
            if (!this.connection) {
                await this.createDB(URI, DB_NAME);
                let conn = await mongoose.connect(URI, {
                })
                this.connection = conn.connection;
                this.logger.info('MongoDB connected successfully');
                this.handleEvents();
            }
        } catch (error) {
            this.logger.error('MongoDB connection error: ', error);
            process.exit(1);
        }
    }

    public getConnection(): Connection {
        if (!this.connection) {
            throw new Error('Database connection not initialized');
        }
        return this.connection;
    }

    private handleEvents(): void {
        this.connection.on('connected', () => {
            console.log('Mongoose connected to DB');
        });

        this.connection.on('error', (err) => {
            console.log('Mongoose connection error:', err.message);
        });

        this.connection.on('disconnected', () => {
            console.log('Mongoose disconnected');
        });

        const handleShutdown = () => {
            // this.connection.close(() => {
            //     console.log('Mongoose connection closed due to app termination');
            //     process.exit(0);
            // })
            this.connection.close();
        }

        process.on('SIGINT', handleShutdown).on('SIGTERM', handleShutdown);
    }
}

export const dbConnectionService = DBConnectionService.getInstance();