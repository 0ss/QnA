
import express, { Request, Response, NextFunction, json, urlencoded, Application } from 'express';
import cors from 'cors'
import helmet from 'helmet'
import { CORS_URL, ENVIROMENT } from './config'
import morganMiddleware from './core/morgan'
import useragent from 'express-useragent'
import rateLimit from 'express-rate-limit'
import routes from './routes'
import { ApiError, BadRequestError, InternalError, NotFoundError } from './core/api.error';
import Logger from './core/logger';

const app : Application  = express();

 

/**
 * Middlewares.
 */

/**
 * HTTP headers adding & modifying
 */
app.use((req: Request, res: Response, next: NextFunction)  =>{
     res.header('X-Made-With-Love-By','salah <3');
    return next();
})
app.use(helmet());
app.use(cors({ origin:CORS_URL, credentials:true,}))

/**
 * Rate Limit on the API
 */
 
app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // limit each IP to 100 requests per windowMs
    message: JSON.parse('{"code": 1, "message": "too many requests, please try again later after 3 min"}'),
    headers:false,
    draft_polli_ratelimit_headers: true,
    skipSuccessfulRequests: true 
}));
/**
 * Proccesing requests, as well as extracting data
 */
app.use(json({ limit: '10mb'}));
app.use(urlencoded({ extended:false} ))
app.use(useragent.express())
app.use(morganMiddleware)

/**
 * Routes
 */
 app.use((req, res, next) =>{
  console.log(1)
  next()
})
app.use('/api', routes);

 
app.use((req, res, next) => next(new NotFoundError()));
 
// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req: Request, res: Response, next: NextFunction) => {
//console.log('is instance ' ,err instanceof ApiError,)
   if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (ENVIROMENT === 'development') {
      Logger.error(err);
      return res.status(500).send(err.message || 'default error message');
    }
    ApiError.handle(new InternalError(), res);
  }
});


export default app;