

import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express';
import { createUser, findUserByEmail } from '../../database/repository/users.repo';
import { compare, hashSync } from 'bcrypt';
import { ForbiddenError } from '../../core/api.error';
import { createToken } from '../../auth';
import { SuccessOkResponse } from '../../core/api.response';
import { RegisterUser } from '../../@types';


const router = Router();

router.post(
    '/likeque',
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
        
        const { name, email, password } = req.body as RegisterUser;

        const user = await findUserByEmail(email);
        if (!user) throw new ForbiddenError('Either email does not exist, or the password is wrong');

        const isMatch = compare(password, user.password)
        if(!isMatch) throw new ForbiddenError('Either email does not exist, or the password is wrong');

        const token = createToken({
            id: user.id,
            email: user.email
        });
         
        return new SuccessOkResponse('Login Success',{
            token
        })
        
    })
)


export default router;