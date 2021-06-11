 import logger from '../core/logger'
import { db } from '../config'
import { createPool } from 'mysql2/promise'
 


export const pool  = createPool ({
    host: db.HOST,
    user: db.USER,
    password: db.PASSWORD,
    database: db.NAME,
})
 
pool.once('connection', () =>{
    logger.info('Database connected successfully !')
})
  
 