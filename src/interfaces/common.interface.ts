import { Request, Response } from "express";

export interface ICRUD<T> {
    getAll(): T[];
    getById(id: string): T | undefined;
    create(payload: Omit<T, 'id'>): T;
    update(id: string, updatedData: Partial<Omit<T, 'id'>>): T | undefined;
    delete(id: string): boolean;
}

export interface IControllerHandlers {
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}

export interface ICustomError extends Error {
    message: string;
}

export interface IDao<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    create(payload: Omit<T, 'id'>): Promise<T>;
    update(id: string, payload: Partial<Omit<T, 'id'>>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}