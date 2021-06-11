

export declare interface User{
    id? : number
    name?: string,
    email? : string,
    password? : string
}

export declare interface JWTBody{
    id: number
    name: string,
    email : string,
 }

export declare interface RegisterUser{
    name: string,
    email : string,
    password: string
}

export declare interface LoginUser{
    email: string,
    password: string
}

export declare interface NewQuestion{
    from_user_id: number,
    to_user_id: number,
    question: string
}


export declare interface AnswerQuestion{
    questionId: number
    answer: string
}

declare interface ErrorsObject{
    field: string,
    message: string
}
export type ErrorsArray = ErrorsObject[]