

import { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express';
import { createUser, findUserByEmail } from '../../database/repository/users.repo';
import { compare, hashSync } from 'bcrypt';
import { ForbiddenError } from '../../core/api.error';
import { createToken } from '../../auth';
import { SuccessOkResponse } from '../../core/api.response';
import { RegisterUser } from '../../@types';
import validator from '../../core/validator';
import schema from './user.schema';


const router = Router();

router.post(
    '/',
    validator(schema.login),
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
        
        const { name, email, password } = req.body as RegisterUser;

        const [user] = await findUserByEmail(email);
        if (!user) throw new ForbiddenError('Either email does not exist, or the password is wrong');

        const isMatch = compare(password, user.password)
        if(!isMatch) throw new ForbiddenError('Either email does not exist, or the password is wrong');

        console.log(user.id)
        const token = await createToken({
            id: user.id,
            name: user.name,
            email: user.email
        });
        console.log(token)
         
        return new SuccessOkResponse('Login Success',{
            token
        }).send(res)
        
    })
)


export default router;