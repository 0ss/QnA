
import app from './app'
import { PORT } from './config'
import logger from './core/logger'
import { pool } from './database'
import * as f from 'faker'
import { createUser } from './database/repository/users.repo'
import axios from 'axios'
import {hashSync} from 'bcrypt'
import gen from './gen'
import  *  as rq from 'random-questions'
import {decode} from 'html-entities';
import { likeQuestionWithId } from './database/repository/questions.repo'

process.once('SIGINT', () =>{
    logger.info('exiting .  .  .  bye <3')
})

const bootstrap = async () =>{
    await pool.getConnection() // an error will be thrown if  the connection wasn't established.
    app
    .set('trust proxy',1)
    .listen(PORT, async () =>{
        logger.info(`app running at port ${ PORT } 🚀 !`);
    })
}

bootstrap()
.catch(err =>{
    logger.error(`Can't bootstrap, due to -> `, err)
})
 



 