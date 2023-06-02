// import modules
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";

// import service routes
import serviceRoutes from "./routes/service.js";

// import user routes
import userRoutes from "./routes/user.js";


//configure dotenv
dotenv.config({ path: './config/config.env' })

//connect db
connectDB();

//invoke express
const app = express()

// body parser middleware
app.use(bodyParser.json());
// service routes middleware
app.use("/service", serviceRoutes);
// user routes middleware
app.use("/user", userRoutes);
// Dev logging middleware
app.use(morgan('dev'));


// Mount routers
app.use(cors())
app.use(express.json())

const port = process.env.PORT
// listen 
const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`)
})

// handle unhandlelled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);

    // close the server and exit the process
    server.close(() => {process.exit(1)});
});