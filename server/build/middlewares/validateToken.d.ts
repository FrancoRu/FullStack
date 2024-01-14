import { Response, Request, NextFunction } from "express";
import { UserToken } from "../types/types";
interface RequestWithUserData extends Request {
    userData?: UserToken;
}
export declare const authRequired: (req: RequestWithUserData, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=validateToken.d.ts.map