const express=require("express")
const app=express();
const path=require("path");
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly , checkAuth } =require("./middlewares/auth")
const PORT=8001;

const {connectMongoDb} = require("./connect");


//routes
const urlRoute= require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute =require("./routes/user");

//connection
connectMongoDb("mongodb://localhost:27017/short-url-Db")
.then(()=>{
    console.log("mongoDb connected successfully");
});

//engine
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

//middleware
app.use(express.json());
app.use(express.urlencoded({extended : false }));
app.use(cookieParser());

//routes
app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user",userRoute);


app.listen(PORT, ()=>{
    console.log(`Server started at : ${PORT}`);
})