import { NextFunction, Router, Response, Request } from "express";
import validator, { ValidationSource } from "../core/validator";
import asyncHandler from 'express-async-handler';
import { getToken } from ".";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
import { AuthFailureError } from "../core/api.error";
import { User } from "../@types";


const router = Router();


router.use( 
    asyncHandler(async (req: Request, res: Response, next: NextFunction) =>{
        req.token = getToken(req.headers.authorization)
        try{
         const payload = await jwt.verify(req.token, JWT_SECRET)
         req.user = payload as User
         next()
            
        }
        catch(e){
            throw new AuthFailureError('Invalid token, please sign in again')
        }
    })

)
export default router