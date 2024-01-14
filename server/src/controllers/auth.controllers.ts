import { Request, Response } from "express";
import User from "../models/user.models";
import bcrypt from "bcryptjs";

import { generateToken, validateToken } from "../libs/token.libs";
import { UserToken } from "../types/types";

interface RequestWithUserData extends Request {
  userData?: UserToken;
}

export const register = async (req: Request, res: Response) => {
  const {
    email,
    password,
    confirmPassword,
    username,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
  } = req.body;

  if (confirmPassword !== password) {
    return res.status(403).json({
      error: ["The confirm password and the password must match"],
    });
  }

  try {
    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(404).json({ error: ["Email in use"] });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSave = await newUser.save();
    const newToken = await generateToken({
      _id: userSave._id,
      username: userSave.username,
      email: userSave.email,
    });

    res.cookie("token", newToken);

    return res.status(201).json({
      user: newUser,
      message: ["User created successfully"],
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: ["Error registering user"] });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(404).json({ error: ["Invalid Credentials"] });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ error: ["Invalid Credentials"] });
    }

    const newToken = await generateToken({
      _id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });

    res.cookie("token", newToken);
    return res.status(200).json({
      user: {
        _id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      },
      message: ["User login successfuly"],
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: ["Error al registrar al usuario"] });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (_req: RequestWithUserData, res: Response) => {
  res.status(200).json({
    message: ["user authorized"],
    ..._req.userData,
  });
};

export const verify = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(403).json({ message: ["user unauthorized"] });

  const userDataToken: UserToken = await validateToken(token);

  const exist = User.findOne({ _id: userDataToken._id });

  if (!exist) {
    res.status(403).json({ error: ["Invalid user"] });
  }

  return res.status(200).json({
    message: ["user authorized"],
    ...userDataToken,
  });
};
