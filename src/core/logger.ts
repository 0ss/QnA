import winston, { Logger  } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { LOG_DIR  } from '../config';
import dateFormat from 'dateformat'


let dir = LOG_DIR;
if (!dir) dir = path.resolve('logs');
console.log(LOG_DIR)
// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const level = 'info'
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format  = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize(),
  winston.format.splat(),
  winston.format.printf(
    info  => {
       return `${dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT")} [${info.level}]: ${info.message}`
    },
  ),
)
 const Logger : Logger = winston.createLogger({ 
  // this is 'info' level console logger, will not be saved to any daily file.
  level,
  levels,
  format,
  transports: [
    new winston.transports.Console(),
  ]
})


export const morganLogger : Logger  = winston.createLogger({
  // this is 'http' level logger, will be saved to daily file.
  level:'http',
  levels,
  format,
  transports: [
      new winston.transports.Console(),
      new DailyRotateFile({
          filename: `${LOG_DIR}/http-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
      })   
   ],
  });

  /**
   * TWO LOGGERS
   *  one is 'info' level only used for console
   *  other is 'http' level used for console and daily file
   */

export default Logger
