import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import winston from "winston";
import * as dotenv from 'dotenv'
import {fakerES as faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __mainDirname = path.join(__dirname, '..')

const generateProduct = () =>{
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int({min: 0, max: 20})
    }
}

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (password, userPassword) => bcrypt.compareSync(password, userPassword);
export {__dirname, __mainDirname};

export { generateProduct};



dotenv.config();

const ENVIRONMENT = process.env.ENVIRONMENT;

let logger;

const customLevelOptions={
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        http:4,
        debug:5
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning:'yellow',
        info: 'green',
        http: 'cyan',
        debug: 'blue'
    }
}

if(ENVIRONMENT === 'PRODUCTION'){
    console.log("MODO: PRODUCTION")

    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports:[
            new winston.transports.Console({
                level:'info',
                format:winston.format.combine(
                    winston.format.colorize({
                        all:true,
                        colors: customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            }),
    
            new winston.transports.File({
                filename:'./src/logs/errors.log',
                level: 'error'
            })
        ]
    });
}else if (ENVIRONMENT === 'DEVELOPMENT'){
    console.log("MODO: DEVELOPMENT")
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports:[
            new winston.transports.Console({
                level:'debug',
                format:winston.format.combine(
                    winston.format.colorize({
                        all:true,
                        colors: customLevelOptions.colors
                    }),
                    winston.format.simple()
                )
            }),
    
           
        ]
    });
}else{
    console.log("ENVIRONMENT:", ENVIRONMENT);
}

export const addLogger =(req, res, next) => {
    req.logger = logger;
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next()
}

export const fatalLogger =  (req, res, next) =>{

    req.logger.fatal(`Route not found: ${req.method} ${req.url}`);

    res.status(404).json({
        status: 'Fatal',
        message: 'Route not found'
    });
}

// JWT
const PRIVATE_KEY = "CoderKey";

const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
    return token;
}


export{ generateToken, PRIVATE_KEY}