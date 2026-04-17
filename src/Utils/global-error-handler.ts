import type { Request, Response, NextFunction } from "express";
import { isHttpError } from "http-errors";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = isHttpError(err) ? err.status : 500;
  const message = isHttpError(err) ? err.message : "Internal Server Error";

  res.status(statusCode).json({
    code: statusCode,
    message,
    data: null,
  });
};