import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import dbConnect from "./util/dbConnect";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// MIDDLEWARES IMPORT
import error from "./middleware/error"

//ROUTES IMPORTATION0
import loginRoute from "./routes/auth/login";
/* const ordersRoute = require("./routes/orders/index");
const stateRoute = require("./routes/states/index");
const companyRoute = require("./routes/company/index");
const purchaseRoute = require("./routes/orders/index"); */


//DB INITIALIZATION
dbConnect();
//PORT
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser());

//ROUTES
/* app.use("/api/states", stateRoute);
app.use("/api/companies", companyRoute);
app.use("/api/purchase", purchaseRoute); */
app.use("/api/login", loginRoute);
//app.use("/api/orders", ordersRoute);

//ERROR HANDLING MIDDLEWARE
app.use(error);

app.listen(PORT, () => {
    console.log(`server connected on PORT ${PORT}`);
})