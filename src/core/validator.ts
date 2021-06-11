
 import { Request, Response, NextFunction } from 'express';
import * as j from 'joi'
import { ErrorsArray } from '../@types';
import { AuthFailureError, BadRequestError } from './api.error';
import { StatusCodeMessages } from './api.response';
import Logger from './logger';

export const enum ValidationSource {
    BODY = 'body',
    HEADER = 'headers',
}

export const JoiAuthBearer = () =>
j.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
    if (!value.split(' ')[1]) return helpers.error('any.invalid');
    return value;
}, 'Authorization Header Validation');

export default(schema: j.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => {
    return function(req: Request, res: Response, next: NextFunction,) { 
        try {

            const { error } = schema.validate(req[source],{ abortEarly:false });
             if (!error) return next();
             const { details } = error;
             const errors = [] as ErrorsArray
             details
             .forEach(e =>{
                 errors.push({
                     field: (e.context?.key ?? e.path.toString()),
                     message: e.message.replace(/['"]+/g, '')
                 })
             })

             throw new BadRequestError(StatusCodeMessages.BAD_REQUEST,{errors})

        } 
        catch (error) {
            next(error);
        }
    }
};