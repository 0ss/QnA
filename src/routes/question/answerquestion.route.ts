

import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express';
import { AuthFailureError, InternalError } from '../../core/api.error';
import { SuccessCreatedResourceResponse } from '../../core/api.response';
import { AnswerQuestion  } from '../../@types';
import validator from '../../core/validator';
import schema from './question.schema'
import { answerQuestion, getQuestionInfoById } from '../../database/repository/questions.repo';
import authentication from '../../auth/authentication'

const router = Router();

router.use('/',authentication)


router.post(
    '/',
    validator(schema.newQuestion),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
         
        const {questionId, answer} = req.body as AnswerQuestion

        const questionInfo = await getQuestionInfoById(questionId)
        
        
        if(questionInfo.to_user_id != req.user.id) throw new AuthFailureError(`You're trying to answer question a new behalf of another user`)
       
        const answeredQuestion = await answerQuestion(questionId, answer);

        if(answeredQuestion.affectedRows) return new SuccessCreatedResourceResponse('Your answer has been submitted').send(res)
         throw new InternalError(`Something wasn't right while processing your answeer`)
        
    })
)


export default router;