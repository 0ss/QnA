

import app from './app'
import { PORT } from './config'
import logger from './core/logger'
import { pool } from './database'
import * as f from 'faker'
import { createUser } from './database/repository/users.repo'
import axios from 'axios'
import {hashSync} from 'bcrypt'

import  *  as rq from 'random-questions'
import {decode} from 'html-entities';
import { likeQuestionWithId, answerQuestion } from './database/repository/questions.repo'
 
export default {

     async users (){
        for(var i =0; i<5000; i++){
            const name = f.name.findName()
            const email = f.internet.email(name)
            const password = hashSync(f.internet.password(8),1)

             createUser({
                name,
                email,
                password
            })
            .then()
            .catch()
        }
     },
     async like(){
        for(var i =0; i<20000; i++){
        likeQuestionWithId(Math.floor(Math.random() * 5000) + 1,  Math.floor(Math.random() * 19000) + 5)
        }
     },
    //  async qna(){
    //      const qs : any = []
    //     for(var i =0; i<10; i++){
    //         const e = await axios.get('https://opentdb.com/api.php?amount=50')
    //         e.data.results.map(e => decode(e.correct_answer)).forEach(e => qs.push(e)) 
    //     }
    }
    //     for(var i =0; i<qs.length; i++){
    //         await  answerQuestion(Math.floor(Math.random() * 21000) + 1, qs[i]);
    //     }
         
    //     for(var i =0; i<qs.length; i++){
    //         await answerQuestion(Math.floor(Math.random() * 21000) + 1, qs[i]);
    //     }
         
    //     for(var i =0; i<qs.length; i++){
    //         await   answerQuestion(Math.floor(Math.random() * 21000) + 1, qs[i]);
    //     }
         
    //     for(var i =0; i<qs.length; i++){
    //         await   answerQuestion(Math.floor(Math.random() * 21000) + 1, qs[i]);
    //     }
         
    //     for(var i =0; i<qs.length; i++){
    //         await    answerQuestion(Math.floor(Math.random() * 21000) + 1, qs[i]);
    //     }
         
    //     for(var i =0; i<qs.length; i++){
    //         await     answerQuestion(Math.floor(Math.random() * 21000) + 1, qs[i]);
    //     }
         
         
    //  },


//     for(var i =0; i<10; i++){
//         console.log(rq.getQuestion())
//     }
//     const qna = await axios.get('https://opentdb.com/api.php?amount=2')
//     console.log(qna.data.results.map(e => 
// [ decode(e['question']), decode(e['correct_answer'])]
     
//         )
//     )
    

