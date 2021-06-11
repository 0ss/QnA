import { findUserByEmail, userExistsByEmail } from "../../database/repository/users.repo"
import { Request, Response, NextFunction, Router } from 'express';
import { ConflictError, ForbiddenError, InternalError } from '../../core/api.error'
import { hash } from 'bcrypt'
import { createUser } from '../../database/repository/users.repo'
import asyncHandler from 'express-async-handler'
import { SuccessCreatedResourceResponse, SuccessNoContentResponse } from "../../core/api.response";
import rateLimit from "express-rate-limit";
import validator from "../../core/validator";
import schema from '../../routes/user/user.schema'
import { OkPacket } from "mysql2";

const router = Router();
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message: JSON.parse('{"code": 1, "message": "too many accounts created from this IP, please try again after an hour"}')
});

  
router.post(
    '/',
   validator(schema.register),
   createAccountLimiter ,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{

        const { name, email, password } = req.body;
        
         if( (await userExistsByEmail(email) ) ) throw new ConflictError('User with this email already registered');

        const hashedPassword = await hash(password,10);
        
        const [createdUser] : OkPacket[]  = await createUser({
            name,
            email,
            password: hashedPassword
        })
        if(createdUser.affectedRows){
            return new SuccessCreatedResourceResponse(`Welcome ${name}! you're registered successfully`,{
                name,
                email
            }).send(res)
        }
       throw new InternalError(); 
    })
)


 

export default router;