const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")
import dbConnect from "./util/dbConnect";
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// MIDDLEWARES IMPORT
import error from "./middleware/error";

//ROUTES IMPORTATION
import loginRoute from "./routes/auth/login";
import ordersRoute from "./routes/orders/index";
import stateRoute from "./routes/states/index";
import companyRoute from "./routes/company/index";
import purchaseRoute from "./routes/orders/index";


//DB INITIALIZATION
dbConnect();
//PORT
const PORT = process.env.PORT;

app.use(bodyParser.json())
app.use(cors());
app.use(cookieParser());

//ROUTES
app.use("/api/states", stateRoute);
app.use("/api/companies", companyRoute);
app.use("/api/purchase", purchaseRoute);
app.use("/api/login", loginRoute);
app.use("/api/orders", ordersRoute);

//ERROR HANDLING MIDDLEWARE
app.use(error);

app.listen(PORT, () => {
    console.log(`server connected on PORT ${PORT}`);
})