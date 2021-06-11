import { Response } from 'express';
import { ErrorsArray } from '../@types';
import { ENVIROMENT } from '../config';
import {
  AuthFailureResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
  StatusCodeMessages,
  StatusCode,
} from './api.response';

enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export class ApiError extends Error {
  constructor(public type: ErrorType,  public message: string | StatusCodeMessages ,public data : any = null) {
    super(type);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = type
  }

  public static handle(err: ApiError, res: Response): Response {
    console.log('from handle', err)
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message, err.data).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message, err.data).send(res);
      case ErrorType.NOT_FOUND:
       case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message, err.data).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message, err.data).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message, err.data).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may leak sensitive data
        if (ENVIROMENT === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class AuthFailureError extends ApiError {
  constructor(message : string  = StatusCodeMessages.UNAUTHORIZED , data : any = null) {
    super(ErrorType.UNAUTHORIZED, message, data );
  }
}

export class InternalError extends ApiError {
  constructor(message : string = StatusCodeMessages.INTERNAL_ERROR , data : any = null){
    super(ErrorType.INTERNAL, message, data);
  }
}

export class BadRequestError extends ApiError {
  constructor(message : string = StatusCodeMessages.BAD_REQUEST, data : any = null ) {
    super(ErrorType.BAD_REQUEST, message, data);
   }
}

export class NotFoundError extends ApiError {
  constructor(message : string = StatusCodeMessages.NOT_FOUND, data : any = null) {
    super(ErrorType.NOT_FOUND, message, data);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message : string = StatusCodeMessages.FORBIDDEN, data : any = null) {
    super(ErrorType.FORBIDDEN, message , data);
  }
}
export class ConflictError extends ApiError {
    constructor(message : string = StatusCodeMessages.CONFLICT, data : any = null) {
      super(ErrorType.BAD_TOKEN, message , data);
    }
  }
  
  
 