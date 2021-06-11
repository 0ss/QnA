import { Router } from 'express';
 
import register from './user/register.route';
import login from './user/login.route';
import logout from './user/logout.route';
import newquestion from './question/newquestion.route'
const router = Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
//router.use('/', apikey);
/*-------------------------------------------------------------------------*/

/**
 * User Route
 */
router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);

/**
 * Question route
 */
router.use('/questions/new',newquestion)

export default router;



