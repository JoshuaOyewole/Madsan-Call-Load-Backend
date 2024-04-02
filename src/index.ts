const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")
const dbConnect = require("./util/dbConnect");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// MIDDLEWARES IMPORT
const error = require("./middleware/error");

//ROUTES IMPORTATION0
const loginRoute = require("./routes/auth/login");
const ordersRoute = require("./routes/orders/index");
const stateRoute = require("./routes/states/index");
const companyRoute = require("./routes/company/index");
const purchaseRoute = require("./routes/orders/index");


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