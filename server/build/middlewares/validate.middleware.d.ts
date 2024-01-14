import { Request, Response, NextFunction } from 'express';
import { UserToken } from '../types/types';
interface RequestWithUserData extends Request {
    userData?: UserToken;
}
export declare const validateSchema: (schema: any) => (req: RequestWithUserData, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export {};
//# sourceMappingURL=validate.middleware.d.ts.map