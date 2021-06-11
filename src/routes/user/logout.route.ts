

import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express';
import { SuccessOkResponse } from '../../core/api.response';
import validator from '../../core/validator';
import schema from './user.schema';
//import { authentication } from '../../auth/authentication'


/*
I think there is no point from this endpoint, because jwt stateless, 
so there will not be deleting token from the database like sessions
unless there is blacklist mechanism that blacklist jwt after user logs out
then it will be useful, however I kept the endpoint for convention 
وبس والله :)  
 */
const router = Router();
///router.use('/', authentication)
router.post(
    '/logout',
    validator(schema.authHeader),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
       return new SuccessOkResponse(
            'logout successfully'
        )
    })
)


export default router;