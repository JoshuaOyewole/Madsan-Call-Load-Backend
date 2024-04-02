import User from "../../models/company";
import { Request, Response, NextFunction } from 'express';
const bcrypt = require("bcryptjs");
const createError = require("../../util/error");
const jwt = require("jsonwebtoken");
import { StatusCodes } from "http-status-codes";

//User Registration
/* const register= async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userPhone = await User.findOne({ phone: req.body.phone });

    if (userPhone) return next(createError(401, "Phone Number already Exist!"));

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = {
      ...req.body,
      password: hash,
    };

    const response = await User.create(newUser);
    res.status(200).json({
      success: true,
      message: ` Registration successful!`
    });
  } catch (err) {
    if (err.keyValue?.phone) {return next(createError(401, `Phone already Exist!`));}
    console.log(err);
    next(createError(400, `An Error occured! Try Again`));
  }
}; */

// Login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req.body.email === (undefined || "" || " ") ||
      req.body.password === (undefined || "" || " ")
    )
      return next(createError(403, "Kindly fill the required fields"));

    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(StatusCodes.NOT_FOUND, "Incorrect Credentials Entered!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(StatusCodes.BAD_REQUEST, "Incorrect Password, Kindly Try Again!"));
    }
    const { email, companyName, phone, _id: id } = user; //Destructing password from the user details recieved...

    const jwt_payload = {
      email, companyName, id
    };

    const token = jwt.sign(jwt_payload, process.env.JWT_SECRET);
    /*res.cookie("access_token", token, {
        path:"/",
        sameSite:"none",
        httpOnly: false,
        expires: new Date(Date.now() + (1000*60*60*12)),//it will last for 12hrs. Try and refresh the Token after 12hrs again--> 10/08/22(12:46pm)
        maxAge: 1000 *60 * 60 *12,
        //secure: true Set to TRUE when pushing to production
      })
      .status(200)
      .json({
        "success": true,
        "status": 200,
        "message": `Logged in successfully!`,
        "details": {
          _id, isAdmin, firstname, lastname
        }
      }); */
    return res.status(StatusCodes.OK).json({
      success: true,
      status: 200,
      message: `Logged in successfully!`,
      details: {
        email, companyName, phone, id
      },
      token: token,
    });
  } catch (err) {
    console.log(err);

    next(createError(400, err.message));
  }
};

//LOGOUT
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //get the token from the req
    const token = req.cookies.access_token;

    if (!token || token)
      return res.clearCookie("access_token").status(200).json({
        success: true,
        status: 200,
        message: `Logout successfully!`,
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export { login, logout } 