import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.cookies?.token ||null;
    const user = req.cookies?.userEmail || null;
    const email = user?.user || null;
  if (!token || !email) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access",
      redirectTo: '/login',
    });
    }
    
  try {
    const decoded = jwt.verify(
      token,
      config.secret as string
      ) as jwt.JwtPayload;
      if (decoded.payload.user == email) {
          next();
      }
  }
  catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Forbidden access",
      redirectTo:'/login',
    });
  }
};
