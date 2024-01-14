import { Response, Request, NextFunction } from "express";
import { validateToken } from "../libs/token.libs";
import { UserToken } from "../types/types";
import User from "../models/user.models";
interface RequestWithUserData extends Request {
  userData?: UserToken;
}

export const authRequired = async (
  req: RequestWithUserData,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({
        error: ["No token, authorization denied"],
      });
    }

    const userDataToken: UserToken = await validateToken(token);

    const exist = User.findOne({ _id: userDataToken._id });

    if (!exist) {
      res.status(403).json({ error: ["Invalid user"] });
    }

    req.userData = userDataToken;

    next();
    return;
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      error: ["Unauthorized - Invalid token"],
    });
  }
};
