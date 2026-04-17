export class apiResponse<T = unknown> {
  public statusCode: number;
  public message: string;
  public data: T;

  constructor(statusCode: number, data: any = [], message: string = "success") {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
