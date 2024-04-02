import jwt from "jsonwebtoken";
const createError = require("../util/error");
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    //Get the User Token
    let token = req.headers?.authorization?.replace('Bearer ', '');
    //Verify the User Token
    if (token) {

        //verify if a token is valid. If not valid throw an error
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {

            //if valid, access the data in the token in a req variable
            if (!err) {
                //req.user = data;
                return next();
            } else {
                return createError(403, "Access denied, Incorrect Authorization Code"
                );
            }
        });
    } else {
        return next(createError(401, "Access denied, No Authorization code"));
    }
};


export { verifyToken }