
import * as dotenv from 'dotenv'
 
dotenv.config()

export const ENVIROMENT  = process.env.NODE_ENV as 'development' | 'production' ;
export const PORT : Number = Number(process.env.PORT);
export const ENVIROMENT_PATH = '../../.env';
export const LOG_DIR = process.env.LOG_DIR;
export const CORS_URL = process.env.CORS_URL;
export const JWT_SECRET = process.env.JWT_SECRET ?? ' '
export const JWT_LIFE = process.env.TOKEN_VALIDITY_DAYS;


export const db  = {
    NAME: process.env.DB_NAME || '',
    HOST: process.env.DB_HOST || '',
    PORT: process.env.DB_PORT || '',
    USER: process.env.DB_USER || '',
    PASSWORD: process.env.DB_USER_PWD || '',
};

