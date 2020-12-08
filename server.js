const express = require("express");
const app = express();
require('dotenv').config({path:"./config/.env"})

// Import Routes
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
// use middleware
app.use(express.json())
// Route middleware
app.use("/api/user",authRoute);
app.use("/api/posts",postRoute);


// connect to db
const mongoose = require ("mongoose")
mongoose.connect(process.env.uri1,{ useNewUrlParser: true , useUnifiedTopology: true },() => console.log("db connected"))



app.listen(5000,(error) => {
    if (error)  console.log(error);
    else console.log("server is running")
});