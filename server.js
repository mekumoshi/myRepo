// import modules
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import serviceRoutes from "./routes/service.js";


//configure dotenv
dotenv.config({ path: './config/config.env' })

//connect db
connectDB();

//invoke express
const app = express()

// routes middleware
app.use("/service", serviceRoutes);
// Dev logging middleware
app.use(morgan('dev'));


// Mount routers
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to quickfix api"
    });
})
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