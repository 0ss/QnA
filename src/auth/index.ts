

import { JWTBody, User } from "../@types";
import { AuthFailureError } from "../core/api.error";
import { sign, verify } from 'jsonwebtoken'
import { JWT_LIFE, JWT_SECRET } from "../config";


export const createToken = async (
    payload: JWTBody,
 ): Promise<any> =>{
     console.log(JWT_LIFE)
    const token = await sign({
        ...payload
    }
    ,JWT_SECRET,
    {
        algorithm: "HS256",
        issuer: "qna platform",
        expiresIn: JWT_LIFE,
    });
    return token;

}

export const getToken =  (token? : string) : string =>{
    if(!token) throw new AuthFailureError('Token is not present, sign in to get new one');
    if (!token.startsWith('Bearer ')) throw new AuthFailureError('Token format is invalid, sign in to get new one');
    return token.split(' ')[1];
};

export const isValidToken = (token : string = '' ) : Boolean  =>{
    try{
        verify(token , JWT_SECRET)
        return true
    }
    catch(e){
        throw new AuthFailureError('Invalid token, sign in to get new one');
    }

}