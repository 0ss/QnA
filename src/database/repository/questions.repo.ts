  
import logger from '../../core/logger'
import { pool } from '..';
import { RowDataPacket,Field, OkPacket, FieldPacket } from 'mysql2';
import { NewQuestion, RegisterUser, User } from '../../@types';
import { BadRequestError } from '../../core/api.error';

/**
 * 
 * @param id 
 * @returns all the questions this user with this id has got and didn't answer yet

 */
 export const getQuestionInfoById = async (id: number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        SELECT * FROM questions
        WHERE id = ?
        LIMIT 1;
        `,[id]
        )
    return query[0];
   
}
export const getQuestionsToMe = async (id: number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        SELECT * from questions
        WHERE to_user_id=?
        `,[id]
        )
    return query[0];
   
}

export const getQuestionsFromMe = async (id : number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
    `
    SELECT * FROM questions 
    WHERE from_user_id = ? 
    `,[id]
    ) 
    return query[0];
}

export const answerQuestion = async (id: number, answer: string) : Promise<any> =>{
    const query = await pool.query<OkPacket[]>(
        `
        UPDATE questions 
        SET answer = ?
        WHERE id = ?
        LIMIT 1;
        `,[answer, id]
        )
    return query[0];
   
}
 
 

export const askQuestion = async (fromId : number, toId: number, question: string) : Promise<any> =>{
    fromId = fromId ?? null;
    const query = await pool.query<OkPacket[]>(
    `
    INSERT INTO questions (from_user_id, to_user_id,question)
    VALUES
    (?,?,?)

    `,[fromId, toId, question]
    ) 
    return query[0];
}


// you can only like questions that have been answered. 
export const likeQuestionWithId = async (userId: number, questionId: number) : Promise<any> =>{
    const isAnswer = await getQuestionInfoById(questionId); 
     
    if(!isAnswer[0].answer) throw new BadRequestError(`You can't like unanswered question`)
    const query = await pool.query<OkPacket[]>(
    `
    INSERT INTO likes (user_id, question_id)
    VALUES
    (?,?)

    `,[userId, questionId]
    ) 
    return query[0];
}

export const getMyLikes = async (id: number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `  
        SELECT user_id,id,from_user_id,to_user_id,question, question_created_at, answer, answer_created_at FROM likes l
        LEFT JOIN questions q
        ON q.id = l.question_id
        WHERE user_id = ?
        `,[id]
        );  
    return query[0]
}
export const getCountLikesOfQuestion = async (id: number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        SELECT id , question, answer, COUNT(*) as likes_number FROM likes l
        LEFT JOIN questions q
        ON q.id = l.question_id
        WHERE q.id = ?
        GROUP BY  question_id              
        `,[id]
        );  
    return query[0]
}


// the question could be new question has not been answered yet or an answered question
export const deleteQuestionWithId = async (id : number) : Promise<any> =>{
     
    const query = await pool.query<OkPacket[]>(
    `
    delete FROM questions WHERE id = ?
    `,[id]
    ) 
    return query[0];
}

 


