

import * as j from 'joi'
import { JoiAuthBearer } from '../../core/validator'


export default {
    login : j.object().keys({
        email: j.string().required().email(),
        password: j.string().required().min(6).max(20)
    }),
    authHeader: j.object().keys({
        authorization: JoiAuthBearer().required()
    }),
    register : j.object().keys({
        name: j.string().required().min(2).max(20),
        email: j.string().required().email(),
        password: j.string().required().min(6).max(20)
    })
}