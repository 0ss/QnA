
import { Response } from 'express';
import { ErrorsArray } from '../@types';

export const enum BodyCode {
    SUCCESS = 0,
    FAILURE = 1,
    INVALID_TOKEN =2
}
export const enum StatusCode  {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}
export const enum StatusCodeMessages   {
    SUCCESS = 'the request is OK',
    CREATED = 'the request is complete, and a new resource is created',
    NO_CONTENT = 'the request is OK, nothing more to say',
    BAD_REQUEST = 'the server did not understand the request',
    UNAUTHORIZED = 'unauthorized',
    FORBIDDEN = 'forbidden',
    NOT_FOUND = 'the server can not find the requested page, or maybe the page exists but the HTTP method is wrong',
    CONFLICT = 'Conflict',
    INTERNAL_ERROR = 'Something went wrong, it is not your fault, the server met an unexpected condition. ',
}


export class ApiResponse {
    private statusCode : StatusCode;
    private code : BodyCode; 
    private message : string | StatusCodeMessages;
    private data : Object | null
    
    constructor(statusCode: StatusCode,code:BodyCode,  message: string , data: Object | null ){
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
        this.data = data;
     }
     public send(res: Response): Response {
       const {code, message, data } = this
      return res.status(this.statusCode).json({
        code,
        message,
        data
      });
    }     
}

  export class AuthFailureResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.UNAUTHORIZED , data: any = null) {
      super(StatusCode.UNAUTHORIZED, BodyCode.FAILURE, message , data );
    }
  }
 export class NotFoundResponse extends ApiResponse {  
    constructor(message : string = StatusCodeMessages.NOT_FOUND, data: any = null) {
      super(StatusCode.NOT_FOUND, BodyCode.FAILURE, message, data );
    }
  }

  export class ForbiddenResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.FORBIDDEN, data: any = null ) {
      super(StatusCode.FORBIDDEN, BodyCode.FAILURE, message , data);
    }
  }
  
  export class BadRequestResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.BAD_REQUEST, data: any = null) {
      super(StatusCode.BAD_REQUEST, BodyCode.FAILURE, message, data );
    }
  }
  
  export class InternalErrorResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.INTERNAL_ERROR, data: any = null) {
      super(StatusCode.INTERNAL_ERROR, BodyCode.FAILURE, message, data);
    }
  }
  
  export class SuccessOkResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.SUCCESS, data: any = null) {
      super(StatusCode.SUCCESS, BodyCode.SUCCESS, message, data );
    }
  }
  export class SuccessCreatedResourceResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.NO_CONTENT, data: any = null) {
      super(StatusCode.CREATED, BodyCode.SUCCESS, message , data);
    }
  }
  export class SuccessNoContentResponse extends ApiResponse {
    constructor(message : string = StatusCodeMessages.NO_CONTENT, data: any = null) {
      super(StatusCode.NO_CONTENT, BodyCode.SUCCESS, message , data);
    }
  }
  

  
  
//  export class ApiResponseSuccess{
//     private statusCode : StatusCode;
//     private code : BodyCode; 
//     private messsage : string;
//     private data : any;
//     /**
//      * Create a response object.
//      * @param {StatusCode} statusCode - The statuscode depened on the enum value, for example BAD_REQUEST return 400.
//      * @param {string} message - what you want to tell to the user, for message: "user created!".
//      * @param {any} data - any kind of data return, usually with success requests
//      */
//     constructor(statusCode: StatusCode, message: string, data? : any ){
//         this.code = BodyCode.SUCCESS;
//         this.messsage = message;
//         this.statusCode = statusCode;
//     }
//     send(res : Response) : Response {
//         return this.data 
//         ? res
//         .status(this.statusCode)
//         .json({
//             code: this.code,
//             message : this.messsage,
//         })
//         :
//         res
//         .status(this.statusCode)
//         .json({
//             code :this.code,
//             message : this.messsage,
//             data : this.data
//         }) 
//     };
// }

// export class ApiResponseError{
//     private statusCode : StatusCode;
//     private code : BodyCode; 
//     private messsage : string;
//     private errors : any;
//     /**
//      * Create a response object.
//      * @param {StatusCode} statusCode - The statuscode depened on the enum value, for example BAD_REQUEST return 400.
//      * @param {string} message - what you want to tell to the user, for message: "user created!".
//      * @param {any} data - any kind of data return, usually with success requests
//      */

//     constructor(statusCode: StatusCode, message: string , errors? : any ){
//         this.code =BodyCode.FAILURE;
//         this.messsage = message;
//         this.statusCode = statusCode;
//     }
//     send(res : Response) : Response {
//         return this.errors 
//         ? res
//         .status(this.statusCode)
//         .json({
//             code: this.code,
//             message : this.messsage,
//         })
//         :
//         res
//         .status(this.statusCode)
//         .json({
//             code :this.code,
//             message : this.messsage,
//             errors : this.errors
//         }) 
//     };
// }
 
 
