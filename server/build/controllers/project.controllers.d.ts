import { UserToken } from "../types/types";
import { Request, Response } from "express";
interface RequestWithUserData extends Request {
    userData?: UserToken;
}
export declare const getprojects: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createproject: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getproject: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteproject: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateproject: (req: RequestWithUserData, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=project.controllers.d.ts.map