import { UserToken } from '../types/types';
import { Request, Response } from 'express';
interface RequestWithUserData extends Request {
    userData?: UserToken;
}
export declare const getTasks: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createTask: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTask: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTask: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTask: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=tasks.controllers.d.ts.map