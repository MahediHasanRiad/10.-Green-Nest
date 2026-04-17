interface ApiErrorType {
    statusCode: number;
    message: string;
    errors?: string[];
    stack?: string;
    success: boolean;
}

export class ApiError extends Error implements ApiErrorType {
    public statusCode: number;
    public success: boolean;
    public errors: string[];
    public data: any;

    constructor(
        statusCode: number, 
        message: string = "Something went wrong", 
        errors: string[] = [], 
        stack: string = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data = null;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}