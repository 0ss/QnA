import morgan, { StreamOptions } from "morgan";
import { Response, Request} from 'express';
import logger, { morganLogger } from './logger'
 

const stream: StreamOptions = {
    // Use the http severity
    write: (message) =>{
        morganLogger.http(message)// only http 
     }
};
morgan.token('ua', (req: Request, res: Response) : string  =>  {
    return `${req.useragent?.platform} - ${req.useragent?.browser}`;
})
export default morgan(' :remote-addr :method :url :status :res[content-length] BYTES - :response-time ms :ua', {
    stream
});

