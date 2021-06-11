

import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express';
import { AuthFailureError, InternalError } from '../../core/api.error';
import { SuccessCreatedResourceResponse } from '../../core/api.response';
import { NewQuestion  } from '../../@types';
import validator from '../../core/validator';
import schema from './question.schema'
import { askQuestion } from '../../database/repository/questions.repo';
import authentication from '../../auth/authentication'

const router = Router();

router.use('/',authentication)


router.post(
    '/',
    validator(schema.newQuestion),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
        
        const { from_user_id, to_user_id, question } = req.body as NewQuestion

        if(from_user_id != req.user.id) throw new AuthFailureError(`You're trying to post a new behalf of another user`)
       
        const askedQuestion = await askQuestion(from_user_id, to_user_id, question);

        if(askedQuestion.affectedRows) return new SuccessCreatedResourceResponse('Your question has been asked').send(res)
         throw new InternalError(`Something wasn't right while processing your question`)
        
    })
)


export default router;