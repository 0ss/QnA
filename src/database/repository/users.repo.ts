  
import logger from '../../core/logger'
import { pool } from '..';
import { RowDataPacket,Field, OkPacket, FieldPacket } from 'mysql2';
import { RegisterUser, User } from '../../@types';

export const findUserByEmail = async (email: string) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        SELECT id,name,email,password FROM users WHERE email=? LIMIT 1 ;
        `,[email]
        )
    return query[0];
   
}

export const userExistsByEmail = async (email: string) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        select email from users where email=? limit 1
        `,[email]
        )
    return query[0].length;
   
}

export const createUser = async (user : RegisterUser) : Promise<any> =>{

    const query = await pool.query<OkPacket[]>(
    `
    insert into users (name, email, password)
    values
    (?,?,?)
    `,[user.name, user.email, user.password]
    ) 
    return query;
}

export const deleteUserByEmail = async (email: string) : Promise<any> =>{
    const query = await pool.query<OkPacket[]>(
        `
        delete from users where email where email=? limit 1 ;
        `,[email]
        );  
    return query[0]
}


export const followTheUserWithId = async (userId: number, followerId: number) : Promise<any> =>{
    const query = await pool.query<OkPacket[]>(
        `
        INSERT INTO followers 
        (user_id, follower_id)
        VALUES
        (?,?)
              `,[userId, followerId]
        );  
    return query[0]
}

export const getMyFollowers = async (userId: number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        SELECT id,name FROM followers f 
        LEFT JOIN users u
        ON f.follower_id = u.id
        WHERE user_id = ?;
              `,[userId]
        );  
    return query[0]
}

export const getMyFollowing = async (userId: number) : Promise<any> =>{
    const query = await pool.query<RowDataPacket[]>(
        `
        SELECT user_id, NAME FROM followers f 
        LEFT JOIN users u
        ON f.user_id = u.id
        WHERE follower_id = ?;
              `,[userId]
        );  
    return query[0]
}

export const unFollowUserWithId = async (userId: number, followerId: number) : Promise<any> =>{
    const query = await pool.query<OkPacket[]>(
        `
        DELETE FROM followers
        WHERE follower_id=? AND user_id= ?
        `,[followerId, userId]
        );  
    return query[0]
}







