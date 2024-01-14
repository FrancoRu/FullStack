import { Request, Response } from "express";
import { UserToken } from "../types/types";
interface RequestWithUserData extends Request {
    userData?: UserToken;
}
export declare const register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const logout: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const profile: (_req: RequestWithUserData, res: Response) => Promise<void>;
export declare const verify: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
//# sourceMappingURL=auth.controllers.d.ts.map