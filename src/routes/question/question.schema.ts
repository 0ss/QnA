

import * as j from 'joi'
import { JoiAuthBearer } from '../../core/validator'


export default {
    newQuestion : j.object().keys({
        from_user_id: j.number().required(),
        to_user_id: j.number().required(),
        question: j.string().required().min(2).max(240)
    }),
    answerQuestion : j.object().keys({
        questionId: j.number().required()
    }),
    deleteQuestion  : j.object().keys({
        questionId: j.number().required()
    })
}