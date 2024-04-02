 import {Request, Response, NextFunction} from 'express';

const err = (err: 
    { status: number; message: string; stack: any; }, req: Request, res:Response , next: NextFunction) => {
    const errorCode = err.status || 500;
    const errorMessage = err.message || "Error Occured!";
    return res.status(errorCode).json({
        success: false,
        message: errorMessage,
        code: errorCode,
        stack: err.stack
    })
}
 err; 

 export default err;