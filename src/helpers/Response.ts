class Response {
  status: string;
  code: number;
  message: string;
  data: any;
  constructor(code: number, message: string, data: any) {
    this.status = 'success';
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

export class ErrorResponse {
  status: string;
  code: number;
  reason: string;
  constructor(code: number, reason: string) {
    this.status = 'failure';
    this.code = code;
    this.reason = reason;
  }
}

export class ValidationErrorResponse {
  status: string;
  code: number;
  reason: string;
  data: any;
  constructor(code: number, reason: string, data: any) {
    this.status = 'failure';
    this.code = code;
    this.reason = reason;
    this.data = data;
  }
}

export default Response;
