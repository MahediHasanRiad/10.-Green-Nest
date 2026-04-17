interface ApiErrorType {
  statusCode: number;
  message: string;
  errors?: string[];
  success: boolean;
  stack?: string;
}

export class ApiError extends Error implements ApiErrorType {
  public statusCode: number;
  public success: boolean;
  public errors?: string[];

  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors?: string[]
  ) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors ?? [];

    Error.captureStackTrace(this, this.constructor);
  }
}