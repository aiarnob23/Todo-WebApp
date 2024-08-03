import { Response } from "express";

type TResponse<T> = {
  stautsCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.stautsCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};


export default sendResponse;